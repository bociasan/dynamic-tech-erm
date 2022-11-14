import Products from "../Products/Components/Products";
import ProductsControlPanel from "./Components/ProductsControlPanel";
import {useState} from "react";

export default function ProductsPage(){
    const [products, setProducts] = useState([])


    return <>
        <Products products={products}/>
        <ProductsControlPanel setProducts={setProducts}/>
    </>
}
