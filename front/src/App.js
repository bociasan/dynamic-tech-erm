import './App.css';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";
import StocksPage from "./pages/Stocks/StocksPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Produse",
        element: <ProductsPage/>,
    },
    {
        path: "/Stocuri",
        element: <StocksPage/>,
    },

]);

function App() {


    return (
        <div className="App" style={{width: "100%"}}>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
