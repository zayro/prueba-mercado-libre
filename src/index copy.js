import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProductDetail from "./components/productDetail";
import Home from "./components/home";
import NotFound from "./components/404";

import "jquery";
import "bootstrap/dist/css/bootstrap.css";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <App />
        <div className="container">
            <Router history={history}>
                <Switch>

                    <Route exact path="/item/:id">
                        <ProductDetail />
                    </Route>

                    <Route exact path="/item">
                        <Home />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route component={NotFound} />

                </Switch>
            </Router>
        </div>
    </Provider>,
    document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
