// const {getProducts, createProduct, updateProduct, deleteProduct, getNextUniqueId, deleteAllProducts} = require("./Controllers/Products");
// const AuthController = require("./Controllers/Auth")
// const {isSignedIn}=require("./Controllers/Auth");
// const router = require("express").Router();
//
// router.get("/products", getProducts);
// router.get("/products/nextUniqueId", getNextUniqueId);
// router.post("/products", createProduct);
// router.put("/products/:productID", updateProduct);
// router.delete("/products/:productID", deleteProduct);
// router.delete("/deleteAllProducts", deleteAllProducts);
//
// router.get("/stocks", getProducts);
//
//
// router.post('/signup',AuthController.signup);
// router.post('/signin',AuthController.signin);
//
// router.get('/testauthroute',isSignedIn,(req,res)=>{
//     //res.send("A protected route")
//     res.json(req.auth)
// })
//
// module.exports = router;