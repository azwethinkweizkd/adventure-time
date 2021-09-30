const router = require("express").Router();
const natParkSearch = require("./natParkSearch");
router.use("/users", natParkSearch);

module.exports = router;
