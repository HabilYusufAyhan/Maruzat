const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComplaintsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Şikayet", "İstek", "Öneri"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    precedence: {
      type: String,
      enum: ["Düşük", "Orta", "Yüksek", "Acil"],
    },
  },
  { collection: "Complaints", timestamps: true }
);
const Complaints = mongoose.model("Complaints", ComplaintsSchema);

module.exports = Complaints;
