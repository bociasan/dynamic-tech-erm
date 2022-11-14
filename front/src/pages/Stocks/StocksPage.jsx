import {useState} from "react";
import Stocks from "./Components/Stocks";
import StocksControlPanel from "./Components/StocksControlPanel";

export default function StocksPage(){
    const [stocks, setStocks] = useState([])


    return <>
        <Stocks stocks={stocks}/>
        <StocksControlPanel setStocks={setStocks}/>
    </>
}
