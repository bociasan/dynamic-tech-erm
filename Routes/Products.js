const {getProducts, createProduct, updateProduct, deleteProduct, getNextUniqueId, deleteAllProducts} = require("../Controllers/Products");
const router = require("express").Router();

router.get("", getProducts);
router.get("/nextUniqueId", getNextUniqueId);
router.post("", createProduct);
router.put("/:productID", updateProduct);
router.delete("/deleteAllProducts", deleteAllProducts);
router.delete("/:productID", deleteProduct);
module.exports = router;