const Product = require("../Model/Product")
const Counter = require("../Model/Counter")
const {nextUniqueId} = require("../Services/functions");


const getProducts = (req, res) => {
    Product.find((err, products) => {
        if (err) {
            res.send(err);
        }
        res.json(products);
    });
};

const getNextUniqueId = async (req, res) => {
    let sequenceName = req.body.sequenceName
    if (!sequenceName) sequenceName = "Counter"
    let ress = await nextUniqueId(sequenceName)
    console.log(ress)
    res.json(ress)
}



const createProduct = async (req, res) => {
    let newId = await nextUniqueId("Product")
    // console.log(newId)
    let newProductBarcode = "0".repeat(6 - newId.length) + newId
    // console.log(newProductBarcode)
    const product = new Product({
        productBarcode: newProductBarcode,
        title: req.body.title,
        description: req.body.description,
        picURL: req.body.picURL,
    });

    product.save((err, product) => {
        if (err) {
            res.send(err)
        }
        res.json(product)
    })
}

const updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        {_id: req.params.productID},
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                picURL: req.body.picURL,
            },
        },
        {new: true},
        (err, Product) => {
            if (err) {
                res.send(err);
            }
            res.json(Product);
        }
    );
};

const deleteProduct = (req, res) => {
    Product.deleteOne({_id: req.params.productID})
        .then(() => res.json({message: "Product Deleted"}))
        .catch((err) => res.send(err));
};

const deleteAllProducts = (req, res) => {
        Product.deleteMany({})
        .then(() => {
            Counter.findOneAndUpdate(
                {title: "Product"},
                {
                    $set: {
                        count: 1
                    },
                },
                {new: true},)
                .then(() => {
                    res.send({message: "All products deleted and counter reset!"})
                })
                .catch((err) => res.send(err))
        })
        .catch((err) => res.send(err))
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getNextUniqueId,
    deleteAllProducts
};