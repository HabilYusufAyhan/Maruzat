import User from "../model/userModel";
import bcrypt from "bcrypt";
export const getUser = async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ msg: "Geçersiz istek" });
  }

  try {
    const user = await User.findById(userId)
      .select("-password -__v -createdAt -updatedAt")
      .populate("maruzats", "-__v -createdAt -updatedAt")
      .populate("answers", "-__v -createdAt -updatedAt");
    if (!user) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
    res.status(500).json({ msg: "Kullanıcı bilgileri alınırken hata oluştu" });
  }
};
export const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const { name, email, socialMedia } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: "Geçersiz istek" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, socialMedia },
      { new: true, runValidators: true }
    )
      .select("-password -__v -createdAt -updatedAt")
      .populate("maruzats", "-__v -createdAt -updatedAt")
      .populate("answers", "-__v -createdAt -updatedAt");

    if (!user) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Kullanıcı güncellenirken hata oluştu:", error);
    res.status(500).json({ msg: "Kullanıcı güncellenirken hata oluştu" });
  }
};
export const deleteUser = async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ msg: "Geçersiz istek" });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }
    res.status(200).json({ msg: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    console.error("Kullanıcı silinirken hata oluştu:", error);
    res.status(500).json({ msg: "Kullanıcı silinirken hata oluştu" });
  }
};
export const changePassword = async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      msg: "Lütfen tekrar giriş yapın.",
    });
  }
  const [oldPassword, newPassword] = req.body;

  if (!(await bcrypt.compare(oldPassword, user.password))) {
    return res.status(400).json({
      msg: "Lütfen eski şifrenizi tekrar giriniz.",
    });
  }
  user.password = bcrypt.hash(newPassword, 10);
  await user.save();
  return res.status(200).json({
    msg: "Şifreniz başarıyla değiştirildi.",
  });
};
