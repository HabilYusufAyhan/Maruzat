const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    level: {
      type: String,
      enum: ["Yeni Kullanıcı", "Üye", "Deneyimli", "Uzman", "Profesyonel"],
      default: "Yeni Kullanıcı",
    },
    maruzatlari: [
      {
        type: Schema.Types.ObjectId,
        ref: "Maruzat",
        default: [],
      },
    ],
    cevaplari: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
        default: [],
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    socialMedia: {
      facebook: {
        type: String,
        trim: true,
        default: "",
      },
      twitter: {
        type: String,
        trim: true,
        default: "",
      },
      instagram: {
        type: String,
        trim: true,
        default: "",
      },
      linkedin: {
        type: String,
        trim: true,
        default: "",
      },
      youtube: {
        type: String,
        trim: true,
        default: "",
      },
      github: {
        type: String,
        trim: true,
        default: "",
      },
      website: {
        type: String,
        trim: true,
        default: "",
      },
      tikTok: {
        type: String,
        trim: true,
        default: "",
      },
    },
  },
  { collection: "User", timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
