import {PRODUCTS_URL} from "./constants";

export function deleteAllFromCollection(url, type){
    const DELETE_URL = url + `/deleteAll${type}s`
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(DELETE_URL, requestOptions)
        .then(response => response.json())
}

export function getAllFromCollection(url){
    return fetch(url)
        .then(response => response.json())
}

export function saveToCollection(url, bodyContent){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyContent)
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
}

export function generateRandomProduct(){
    const random = Math.floor(Math.random() * 1000)
    const product = {
        title: `Title ${random}`,
        description: `Description ${random}`,
        picURL: `https://picsum.photos/id/${random}/200/200`
    }
    return product
}

export async function generateRandomStock(){
    const products = await getAllFromCollection(PRODUCTS_URL)
    if (products.length > 0){
        const random = Math.floor(Math.random() * products.length)
        const stock = {
            title: `${products[random].title}`,
            description: `Today at ${new Date().toLocaleTimeString()}`,
            productId: products[random]._id
        }
        return stock
    }
    return {error: "There are no products in DB!"}
}