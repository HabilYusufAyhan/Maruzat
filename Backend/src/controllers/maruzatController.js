import Answer from "../model/answerModel";
import Maruzat from "../model/maruzatModel";

export const getMaruzat = async (req, res, next) => {
  try {
    const number = req.body.number;
    if (!number || typeof number !== "number" || number <= 0) {
      return res.status(400).json({ msg: "Geçersiz maruzat sayısı" });
    }
    const maruzats = await Maruzat.find()
      .sort({ createdAt: -1 })
      .limit(number)
      .populate("user", "-password -__v -createdAt -updatedAt");
    if (!maruzats || maruzats.length === 0) {
      return res.status(404).json({ msg: "Maruzat bulunamadı" });
    }
    res.status(200).json(maruzats);
  } catch (error) {
    console.error("Maruzat sayısı alınırken hata oluştu:", error);
    res.status(500).json({ msg: "Maruzat sayısı alınırken hata oluştu" });
  }
};
export const getMaruzatById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "Geçersiz maruzat ID" });
  }
  try {
    const maruzat = await Maruzat.findById(id)
      .populate("user", "-password -__v -createdAt -updatedAt")
      .populate("answers", "-__v -createdAt -updatedAt")
      .populate("upVotes", "-password -__v -createdAt -updatedAt")
      .populate("downVotes", "-password -__v -createdAt -updatedAt");
    if (!maruzat) {
      return res.status(404).json({ msg: "Maruzat bulunamadı" });
    }
    res.status(200).json(maruzat);
  } catch (error) {
    console.error("Maruzat bilgileri alınırken hata oluştu:", error);
    res.status(500).json({ msg: "Maruzat bilgileri alınırken hata oluştu" });
  }
};
export const createMaruzat = async (req, res, next) => {
  const { title, description, image, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ msg: "Başlık ve içerik gerekli" });
  }
  try {
    const maruzat = new Maruzat({
      user: req.user.id,
      title,
      description,
      category: category,
      status: "Açık",
      image: image || "",
    });
    await maruzat.save();
    res.status(201).json(maruzat);
  } catch (error) {
    console.error("Maruzat oluşturulurken hata oluştu:", error);
    res.status(500).json({ msg: "Maruzat oluşturulurken hata oluştu" });
  }
};
export const sendAnswer = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!id || !content) {
    return res.status(400).json({ msg: "Geçersiz istek" });
  }
  try {
    const maruzat = await Maruzat.findById(id);
    if (!maruzat) {
      return res.status(404).json({ msg: "Maruzat bulunamadı" });
    }
    const answer = new Answer({
      user: req.user.id,
      content: content,
      maruzat: id,
      image: req.body.image || "",
      parentAnswer: req.body.parentAnswer || null,
      createdAt: new Date(),
    });
    await answer.save();
    maruzat.answers.push(answer.id);
    await maruzat.save();
    res.status(201).json(answer);
  } catch (error) {
    console.error("Cevap gönderilirken hata oluştu:", error);
    res.status(500).json({ msg: "Cevap gönderilirken hata oluştu" });
  }
};
