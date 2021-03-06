import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./index.scss";

import envio from "../../assets/images/envio-small.png";

import queryString from "query-string";

import { navigate } from "hookrouter";

function Product({ search }) {

    // create state
    const [filter, setFilter] = useState([]);
    const [category, setCategory] = useState([]);



    // control cycle life of component
    useEffect(() => {

        const fetchData = (search) => {
            axios
                .request({
                    method: "get",
                    url: `https://api.mercadolibre.com/sites/MLA/search?q=${search}&offset=0&limit=5`,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then(function (response) {
                    setFilter(response.data.results);

                    const found = response.data.available_filters.find(
                        (element) => element.id === "category");

                    setCategory(found.values);




                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        let params = queryString.parse(document.location.search);

        if (
            params !== "" &&
            typeof params !== "undefined" &&
            Object.keys(params).length !== 0
        ) {
            fetchData(params.search);
        }

        if (search !== "" && typeof search !== "undefined") {
            fetchData(search);
        }
    }, [search]);

    function redirect(id) {
        navigate(`/item/${id}`);
        console.log("redirect", id);
    }

    return (
        <div>
            <div className="row">
                <div className="breadcrumbStyle">
                    <ol className="breadcrumb-edit">
                        {category.map(function (item, index) {
                            return (
                                <li className="breadcrumb-item-edit" key={index}>
                                    {item.name}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>

            <div className="row">
                {filter.slice(0, 4).map(function (item, index) {
                    return (
                        <div className="handleMouse card-size" key={index}>
                            <div
                                className="row"
                                onClick={() => redirect(item.id)}
                            >
                                <div className="col-md-3 mx-auto text-center">
                                    <div className="mx-auto ">
                                        <img
                                            src={item.thumbnail}
                                            className=" mx-auto "
                                            alt="  img-round"
                                            width="180"
                                            height="180"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            $ {item.price.toLocaleString()}
                                            {item.shipping.free_shipping ? (
                                                <img src={envio} alt="envio" />
                                            ) : (
                                                ""
                                            )}
                                        </h5>
                                        <p className="card-text">
                                            {item.title}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted"></small>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="card-body">
                                        {item.address.city_name}
                                    </div>
                                </div>
                            </div>

                            <hr />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default connect()(Product);
