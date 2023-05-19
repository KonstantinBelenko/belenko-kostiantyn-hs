const router = require("../../backend/node_modules/@types/express").Router();

router.get("/", (req, res) => {
  res.send("Home page");
});

module.exports = router;
