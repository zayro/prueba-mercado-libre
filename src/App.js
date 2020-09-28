import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./style/menu.scss";
import Logo_small from "./assets/images/logo-small.png";
import Buscar_small from "./assets/images/buscar-small.png";

import queryString from "query-string";

import {useRoutes} from 'hookrouter';
import Routes from './route'

import NotFound from "./components/404";

function App() {
    document.body.style = "background-color: #eeeeee;";

    const routeResult = useRoutes(Routes)

    const [datos, setDatos] = useState("");



    useEffect(() => {
        let params = queryString.parse(document.location.search);
        console.log(params);

        if (params !== "" && typeof params !== 'undefined' && Object.keys(params).length !== 0  ) {
            console.log(params.search);
            console.log(typeof params);
            setDatos(params.search);

        }
    }, []);



    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos(event.target.value);
    };

    return (
        <div>

            <div className="menu-search  menu-size">
                <div className=" container">
                    <div className=" mx-auto ">
                        <div className="row  menu-search ">
                            <div className="col-2">
                            <a href="/">
                                <div className="navbar-brand-edit">
                                <img src={Logo_small} alt="logo"></img>
                                </div>
                                </a>
                            </div>
                            <div className="col-10-edit">
                                <form className="example" action="/item">
                                    <input
                                        placeholder="Nunca dejes de buscar"
                                        onChange={handleInputChange}
                                        name="search"
                                        id="search"
                                        type="text"

                                        value={datos}
                                    ></input>
                                    <button type="button" >
                                        <a href={`/item?search=${datos}`}>
                                            <img
                                                src={Buscar_small}
                                                alt="search"
                                            />
                                        </a>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container">

                <div className="centerProduct">
                {routeResult || NotFound}
                </div>

            </div>


        </div>
    );
}

export default connect()(App);
