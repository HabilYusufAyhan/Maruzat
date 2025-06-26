import dotenv from "dotenv/config.js";
import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./src/routers/authRouter.js";

import cors from "cors";
// CORS izinlerini aç
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: "https://localhost:5173", // Frontend URL'i burada belirt
    credentials: true, // Çerezlerin gönderilmesine izin ver
  })
);
app.use(cookieParser());
// Statik dosyaların servisi
app.use("/uploads", express.static(path.join(__dirname, "/src/uploads")));

// Formdan gelen değerlerin okunabilmesi için
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// JSON veri limiti ayarı
app.use(express.json({ limit: "50mb" }));

// Routerlar

app.use("/", authRouter);

// Server başlatılır
import "./src/config/database.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Mehmet Test sdfdsfsdf
