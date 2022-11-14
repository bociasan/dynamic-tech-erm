const Stock = require("../Model/Stock")
const Product = require("../Model/Product");
const {nextUniqueId, checkSum} = require("../Services/functions");
const {getProductByProductId} = require("../Services/Products");
const Counter = require("../Model/Counter");

const getStocks = (req, res) => {
    Stock.find((err, stocks) => {
        if (err) {
            res.send(err);
        }
        res.json(stocks);
    });
};

const createStock = async (req, res) => {
    let product = await getProductByProductId(req.body.productId)
    if (product) {
        let newId = await nextUniqueId(product._id)
        // console.log(product.barcode)
        let newStockBarcode = product.productBarcode.slice(product.productBarcode.length - 4, product.productBarcode.length) + "0".repeat(3 - newId.length) + newId
        newStockBarcode += checkSum(newStockBarcode)
        const stock = new Stock({
            productId: req.body.productId,
            title: req.body.title,
            description: req.body.description,
            skuBarcode: newStockBarcode,
            productBarcode: product.productBarcode
        });
        stock.save((err, stock) => {
            if (err) {
                res.send(err)
            }
            res.json(stock)
        })
    } else {
        res.send({message: "Product doesn't exist!"})
    }
}

const deleteAllStocks = async (req, res) => {
    let totalDeletedCount = 0
    let counter = 0
    let breakFlag = false
    let stockCount = await getStockCount()
    let initialCount = stockCount
        // console.log(stockCount)
    const MAX_OPERATIONS_COUNT = stockCount + 100

    async function getStockCount() {
        counter++
        if (breakFlag){
            return 0
        } else {
            let count = await Stock.aggregate([
                {$count: "count"}
            ])
            return count[0]?.count ? count[0].count : 0
        }
    }
    while (stockCount > 0) {
        await Stock.findOne({})
            .then(findResponse => {
                if (findResponse == null || !findResponse.productId || counter > MAX_OPERATIONS_COUNT) {
                    breakFlag = true
                    // console.log("break")
                    return
                }
                // console.log(findResponse)
                Stock.deleteMany({productId: findResponse.productId})
                    .then(deleteResponse => {
                        // console.log(deleteResponse)
                        totalDeletedCount += deleteResponse.deletedCount
                        Counter.deleteOne(
                            {title: findResponse.productId})
                            .then(() => {
                                // console.log(`Counter deleted for ${findResponse.productId}`)
                            })
                            .catch((err) => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        stockCount = await getStockCount()
    }
    let message = {message: `Successfully deleted ${totalDeletedCount} from ${initialCount}.`}
    console.log(message)
    res.send(message)
}

module.exports = {
    getStocks,
    createStock,
    deleteAllStocks
}