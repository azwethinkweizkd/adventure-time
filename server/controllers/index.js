const router = require("express").Router();
const natParkNames = require("./natParkSearch");

router.get("/natParkSearch", natParkNames);

module.exports = router;
