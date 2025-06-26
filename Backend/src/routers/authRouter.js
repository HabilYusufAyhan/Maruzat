const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/verify:id", authController.verifyEmail);
router.post("/forgetpassword", authController.forgetPassword);
router.post("/resetpassword", authController.resetPassword);

module.exports = router;
