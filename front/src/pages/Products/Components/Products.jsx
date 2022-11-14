import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import Product from "./Product";


export default function Products({products}){
    return <Box width={"80%"}>
        {
            products?.map(product => <Product key={product._id} product={product}/>)
        }
    </Box>
}