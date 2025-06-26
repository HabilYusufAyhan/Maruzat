const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maruzat: {
      type: Schema.Types.ObjectId,
      ref: "Maruzat",
      required: true,
    },
    content: {
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
    parentAnswer: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
      default: null, // null ise bu ana cevaptır
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Answer", timestamps: true }
);
const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
