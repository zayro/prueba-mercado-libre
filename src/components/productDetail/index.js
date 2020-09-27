import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import "./index.css";

function ProductDetail() {
    const [info, setInfo] = useState([]);
    const [descrip, setDescrip] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = () => {
            axios
                .request({
                    method: "get",
                    url: `https://api.mercadolibre.com/items/${id}`,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    setInfo([response.data]);
                })
                .catch((error) => {
                    console.log(error);
                });

            axios
                .request({
                    method: "get",
                    url: `https://api.mercadolibre.com/items/${id}/description`,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    setDescrip([response.data]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {info.map((item, index) => {
                return (
                    <div className="row" key={index}>
                        <div className=" card-size">
                            <div className="row">
                                <div className="col-md-8 mx-auto text-center">
                                    <div className="mx-auto ">
                                        <img
                                            src={item.thumbnail}
                                            className=" mx-auto "
                                            alt="Product"
                                            width="680"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-body">
                                        <h5 className="title">
                                            {item.title}
                                        </h5>
                                        <p className="price">
                                            {item.price}
                                        </p>
                                        <p className="card-text">
                                        <button type="button" className="btn btn-primary btn-lg">Comprar</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {descrip.map((item, index) => {
                return (
                    <div className="container row" key={index}>
                        <h4>Descripcion del producto</h4>
                        <div className="description" key={item}>{item.plain_text}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default connect()(ProductDetail);
