const User = require("../model/userModel.js");
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

console.log(process.env);

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı email ile bulma
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "Email ya da şifreniz hatalıdır.",
      });
    }
    if (user.isVerified == false) {
      return res.status(400).json({
        msg: "Lütfen email adresinizi doğrulayınız.",
      });
    }
    // Şifreyi doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Email ya da şifreniz hatalıdır." });
    }

    // Access Token (kısa süreli)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.LOGIN_JWT_SECRET,
      { expiresIn: "15m" } // 15 dakika
    );

    // Refresh Token (uzun süreli)
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "7d" } // 7 gün
    );

    // Access Token'ı HTTP-only cookie olarak gönderme
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Ensure cookies are only sent over HTTPS
      sameSite: "None",
      maxAge: 15 * 60 * 1000,
    });

    // Refresh token'ı istemciye gönderme (cookie veya header)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // JavaScript erişimine kapalı
      secure: true, // Üretimde HTTPS üzerinden çalışır
      sameSite: "None", // ya da "Strict", // Çapraz site istekleri için
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    // Başarılı giriş sonrası yönlendirme
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error("Login Error:", error);
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  console.log("istek geldi");

  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }],
    });
    console.log(existingUser);

    if (existingUser && existingUser.isVerified) {
      res.status(400).json({ msg: "Bu Email kullanımda!" });
    } else if ((existingUser && !existingUser.isVerified) || !existingUser) {
      if (existingUser) {
        await User.findOneAndDelete({ _id: existingUser._id });
      }

      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      });

      await newUser.save();

      console.log("Kullanıcı kaydedildi");

      const jwtPayload = {
        id: newUser.id,
        mail: newUser.email,
      };

      const jwtToken = jwt.sign(
        jwtPayload,
        process.env.CONFIRM_MAIL_JWT_SECRET,
        { expiresIn: "1d" }
      );
      console.log(jwtToken);

      const url = `${process.env.WEB_SITE_URL}sendverifymaillink?id=${jwtToken}`;
      console.log("Gidilecek URL:" + url);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_SIFRE,
        },
      });

      await transporter.sendMail({
        from: "Maruzat <info@maruzat.com>",
        to: newUser.email,
        subject: "Emailinizi Lütfen Onaylayın",
        text: `Emailinizi onaylamak için lütfen şu linke tıklayın: ${url}`,
      });

      res.status(200).json({ msg: "success" });
    }
  } catch (err) {
    console.error("Kullanıcı kaydedilirken hata oluştu: ", err);
    res
      .status(400)
      .json({ msg: "Lütfen girdiğiniz bilgileri kontrol ediniz." });
  }
};
export const verifyEmail = async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ msg: "Geçersiz istek" });
  }

  try {
    const decoded = jwt.verify(id, process.env.CONFIRM_MAIL_JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: "Email başarıyla doğrulandı" });
  } catch (error) {
    console.error("Email doğrulama hatası:", error);
    res.status(500).json({ msg: "Email doğrulama başarısız" });
  }
};
export const logout = async (req, res, next) => {
  try {
    // Çerezleri temizle
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ msg: "Çıkış başarılı" });
  } catch (error) {
    console.error("Logout Error:", error);
    next(error);
  }
};
export const forgetPassword = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const jwtPayload = {
      id: user.id,
      mail: user.email,
    };

    const jwtToken = jwt.sign(
      jwtPayload,
      process.env.RESET_PASSWORD_JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log(jwtToken);

    const url = `${process.env.WEB_SITE_URL}verify?id=${jwtToken}`;
    console.log("Gidilecek URL:" + url);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_SIFRE,
      },
    });

    await transporter.sendMail({
      from: "Maruzat <info@maruzat.com>",
      to: user.email,
      subject: "Şifrenizi sıfırlamak için lütfen tıklayın",
      text: `${url}`,
    });

    res.status(200).json({ msg: "success" });
  } else {
    res.status(400).json({
      msg: "Böyle bir email adresi bulunmamaktadır.",
    });
  }
};
export const resetPassword = async (req, res, next) => {
  const { id } = req.query;
  const { newPassword } = req.body;

  if (!id || !newPassword) {
    return res.status(400).json({ msg: "Geçersiz istek" });
  }

  try {
    const decoded = jwt.verify(id, process.env.RESET_PASSWORD_JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ msg: "Şifre başarıyla sıfırlandı" });
  } catch (error) {
    console.error("Şifre sıfırlama hatası:", error);
    res.status(500).json({ msg: "Şifre sıfırlama başarısız" });
  }
};
