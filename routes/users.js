const express = require("express");
const router = express.Router();
const { register, login, current } = require("../controllers/users.controller");
const { auth } = require("../middlewares/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, current);

module.exports = router;
