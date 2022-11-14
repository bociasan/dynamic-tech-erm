const Product = require("../Model/Product")

function getProductByProductId(productId){
    return Product.findOne(
        {_id: productId}
    );
}

module.exports={
    getProductByProductId
}