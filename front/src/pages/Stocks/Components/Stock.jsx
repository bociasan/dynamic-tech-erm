import {Box, Card, Typography} from "@mui/material";
const Barcode = require('react-barcode');

export default function Stock({stock}){
    let timestamp = Date.parse(stock.createdAt)
    let date = new Date(timestamp)
    // console.log(timestamp)
    // console.log(date)
    return <>
        <Card style={{
            width: 'inherit',
            height: '50px',
            margin: '20px',
            padding: '10px 50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Typography>{stock.title}</Typography>
            <Barcode renderer={'img'} value={stock.skuBarcode} height={30} format={'EAN8'}/>
            {/*/!*<Barcode renderer={'img'} value={stock.productBarcode} height={30}/>*!/*/}
            <Typography>{stock.description}</Typography>
            <Typography>{date.toLocaleString()}</Typography>
        </Card>
    </>
}
