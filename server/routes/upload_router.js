let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("response successful!");
});

module.exports = router;
