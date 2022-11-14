import {Box, Card, Typography} from "@mui/material";

const Barcode = require('react-barcode');

export default function Product({product}) {
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
            <Typography>{product.title}</Typography>
            {/*<Barcode renderer={'img'} value={product.barcode} height={30} format={'EAN8'}/>*/}
            <Barcode renderer={'img'} value={product.productBarcode} height={30}/>
            <Typography>{product.description}</Typography>
            <Box style={{
                backgroundImage: `url(${product.picURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: '50px',
                width: '50px'
            }}></Box>
        </Card>
    </>
}