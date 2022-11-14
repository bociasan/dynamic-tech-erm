const {getStocks, createStock, deleteAllStocks} = require("../Controllers/Stocks");
const router = require("express").Router();

router.get("", getStocks);
router.post("", createStock);
router.delete("/deleteAllStocks", deleteAllStocks);


module.exports = router;