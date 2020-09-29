import React from "react";

// import components
import ProductDetail from "../components/productDetail";
import Product from "../components/product";
import Home from "../components/home";

// create routes
const routes = {
    "/": () => <Home />,
    "/item": () => <Product />,
    "/item/:id": ({id}) => <ProductDetail productId={id} />,
};
export default routes;
