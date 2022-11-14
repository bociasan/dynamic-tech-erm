import {Button, Card} from "@mui/material";
import {useEffect} from "react";
import {
    saveToCollection,
    deleteAllFromCollection,
    generateRandomProduct,
    getAllFromCollection
} from "../../../utils/functions";
import {PRODUCTS_URL} from "../../../utils/constants";

export default function ProductsControlPanel({setProducts}) {
    useEffect(() => {
        getAllProducts()
    }, [])

    function getAllProducts() {
        getAllFromCollection(PRODUCTS_URL)
            .then(products => {
                // console.log(products)
                setProducts(products)
            })
    }

    function deleteAllProducts() {
        deleteAllFromCollection(PRODUCTS_URL, "Product")
            .then(message => {
                console.log(message)
                getAllProducts()
            });
    }

    async function createRandomProduct() {
        let product = generateRandomProduct()
        saveToCollection(PRODUCTS_URL, product).then(data => {
            console.log(data)
            getAllProducts()
        });
    }

    return <Card style={{width: "20%"}}>
        <Button onClick={() => createRandomProduct()}>Create Random Product</Button>
        <Button onClick={() => getAllProducts()}>Get All Products</Button>
        <Button onClick={() => deleteAllProducts()}>Delete All Products</Button>
    </Card>
}