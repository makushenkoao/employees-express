const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { all, add, remove, edit, one } = require("../controllers/employees.controller");

router.get("/", auth, all);
router.get("/:id", auth, one);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
