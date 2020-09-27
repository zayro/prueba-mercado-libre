import React from "react";

import ProductDetail from "../components/productDetail";
import Home from "../components/home";
//import NotFound from "../components/404";

const routes = {
    "/": () => <Home />,
    "/item": () => <Home />,
    "/item/:id": ({id}) => <ProductDetail />,
};
export default routes;
