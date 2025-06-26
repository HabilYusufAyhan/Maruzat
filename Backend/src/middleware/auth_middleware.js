import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const refreshAccessTokenMiddleware = async (req, res, next) => {
  console.log(req.cookies.accessToken);
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Token yok" });
  }

  // Access token var mı kontrol et
  if (accessToken) {
    try {
      // Access token'ı doğrula ve user'ı req.user'a ata
      const decoded = jwt.verify(accessToken, process.env.LOGIN_JWT_SECRET);
      req.user = decoded; // Kullanıcı verisini ekle
      return next(); // Eğer geçerli bir access token varsa, işlemi devam ettir
    } catch (err) {
      // Eğer access token geçerli değilse, refresh token ile yeni access token oluştur
      if (refreshToken) {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_JWT_SECRET,
          (err, decoded) => {
            if (err) {
              return res
                .status(403)
                .json({ message: "Geçersiz refresh token" });
            }

            const newAccessToken = jwt.sign(
              { userId: decoded.userId },
              process.env.LOGIN_JWT_SECRET,
              { expiresIn: "15m" }
            );

            // Yeni access token'ı HTTP-only cookie olarak gönder
            res.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              secure: true, // Ensure cookies are only sent over HTTPS
              sameSite: "None",
              maxAge: 15 * 60 * 1000,
            });

            // Kullanıcıyı request'e ekle
            req.user = decoded;

            return next();
          }
        );
      } else {
        return res.status(403).json({ message: "Refresh token gerekli" });
      }
    }
  } else {
    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(403).json({ message: "Geçersiz refresh token" });
          }

          const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.LOGIN_JWT_SECRET,
            { expiresIn: "15m" }
          );

          // Yeni access token'ı HTTP-only cookie olarak gönder
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true, // Ensure cookies are only sent over HTTPS
            sameSite: "None",
            maxAge: 15 * 60 * 1000,
          });

          // Kullanıcıyı request'e ekle
          req.user = decoded;

          return next();
        }
      );
    } else {
      return res.status(403).json({ message: "Refresh token gerekli" });
    }
  }
};

export const roleMiddleware = (allowedRoles) => async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ msg: "Yetkisiz erişim: Token bulunamadı" });
    }

    // JWT Doğrula
    const decoded = jwt.verify(accessToken, process.env.LOGIN_JWT_SECRET);
    req.user = decoded;

    // Kullanıcıyı MongoDB'de ara
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }

    // Dinamik Yetki Kontrolü
    if (allowedRoles.includes(user.role)) {
      return next(); // Kullanıcı yetkiliyse devam et
    } else {
      return res.status(403).json({ msg: "Yetkisiz erişim" });
    }
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    return res.status(403).json({ msg: "Geçersiz veya süresi dolmuş token" });
  }
};
