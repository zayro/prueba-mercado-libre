import React from "react";

import ProductDetail from "../components/productDetail";
import Product from "../components/product";
import Home from "../components/home";


const routes = {
    "/": () => <Home />,
    "/item": () => <Product />,
    "/item/:id": ({id}) => <ProductDetail productId={id} />,
};
export default routes;
