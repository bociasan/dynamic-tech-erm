import {useEffect} from "react";
import {Button, Card} from "@mui/material";
import {
    deleteAllFromCollection,
    generateRandomStock,
    getAllFromCollection,
    saveToCollection
} from "../../../utils/functions";
import {PRODUCTS_URL, STOCKS_URL} from "../../../utils/constants";

export default function StocksControlPanel({setStocks}) {
    useEffect(() => {
        getAllStocks()
    }, [])

    function getAllStocks() {
        getAllFromCollection(STOCKS_URL).then(res => {
            // console.log(res)
            setStocks(res)
        })
    }

    function deleteAllStocks() {
        deleteAllFromCollection(STOCKS_URL, "Stock").then(res => {
            console.log(res)
            getAllStocks()
        })
    }

    async function createRandomStock(){
        const stock = await generateRandomStock()
        if (!stock.error){
            saveToCollection(STOCKS_URL, stock).then(data => {
                console.log(data)
                getAllStocks()
            });
        } else console.log(stock.error)

    }

    return <Card style={{width: "20%"}}>
        <Button onClick={()=> createRandomStock()}>Create Random Stock</Button>
        <Button onClick={() => getAllStocks()}>Get All Stocks</Button>
        <Button onClick={() => deleteAllStocks()}>Delete All Stocks</Button>
    </Card>
}