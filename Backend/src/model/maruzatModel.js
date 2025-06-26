const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MaruzatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Teknoloji",
        "Sanat",
        "Felsefe",
        "Bilim",
        "Edebiyat",
        "Müzik",
        "Spor",
        "Siyaset",
        "Ekonomi",
        "Sağlık",
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    upVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    downVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ["Açık", "Kapalı"],
      default: "Açık",
    },
    answers: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Answer",
        default: [],
      },
    ],
  },
  { collection: "Maruzat", timestamps: true }
);
const Maruzat = mongoose.model("Maruzat", MaruzatSchema);
module.exports = Maruzat;
