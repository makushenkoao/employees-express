var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/login", (req, res) => {
  res.send("respond with a resource");
});

router.post("/register", (req, res) => {
  res.send("respond with a resource");
});

router.get("/current", (req, res) => {
  res.send("respond with a resource");
});

module.exports = router;
