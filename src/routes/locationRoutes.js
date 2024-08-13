const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  return res.json("hai");
});

module.exports = router;
