const Counter = require("../Model/Counter");

async function nextUniqueId(sequenceName) {
    let newId = await Counter.findOneAndUpdate(
        {title: sequenceName},
        {
            $inc: {count: 1},
        },
        {new: true, upsert: true},
    )
    return newId.count.toString()
}

function checkSum(barcode) {
    let even = 0, odd = 0
    for (let i=0; i<barcode.length; i++){
        if ((i+1) % 2 == 0 ) {
            even += parseInt(barcode[barcode.length - 1 - i])
        } else {
            odd += parseInt(barcode[barcode.length - 1 - i])
        }
    }
    // console.log(odd, even)
    return (10 - [(3 * odd + even) % 10]) % 10
}

module.exports= {
    nextUniqueId,
    checkSum
}