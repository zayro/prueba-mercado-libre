import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./index.scss";

import envio from "../../assets/images/envio-small.png";

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

 function Product(props) {

    const [filter, setFilter] = useState([]);

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

                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        if(props.search !== '' && typeof props.search !== 'undefined'){
            fetchData(props.search)
        }

    }, [props.search]);


    return (
        <div className="row">
            {filter.slice(0, 4).map(function (item, index) {
                return (

                    <div className=" card-size" key={index}>
                       <Router> <Link to={`/item/${item.id}`}>
                        <div className="row">
                            <div className="col-md-4 mx-auto text-center">
                                <div className="mx-auto ">
                                    <img
                                        src={item.thumbnail}
                                        className=" mx-auto "
                                        alt="Responsive"
                                        width="180"
                                        height="180"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        $ {item.price}{" "}
                                        {item.shipping.free_shipping ? (
                                            <img src={envio} alt="envio" />
                                        ) : (
                                            ""
                                        )}

                                    </h5>
                                    <p className="card-text">{item.title}</p>
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
                        </Link> </Router>

                        <hr />
                    </div>
                );
            })}
        </div>
    );
}


export default connect()(Product);
