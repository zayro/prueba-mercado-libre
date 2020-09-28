import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./index.scss";

function ProductDetail({ productId }) {
    const [info, setInfo] = useState([]);
    const [descrip, setDescrip] = useState([]);
    const [category, setCategory] = useState([]);
    const [currency, setCurrency] = useState([]);

    useEffect(() => {
        const category = async (categoryId) => {
            const response = await axios.get(
                `https://api.mercadolibre.com/sites/MLA/search?category=${categoryId}`
            );
            const data = await response;

            setCategory(data.data.filters[0].values[0].path_from_root);
        };

        const currency = async (id) => {
            const response = await axios.get(
                `https://api.mercadolibre.com/currencies/${id}`
            );
            const data = await response;
            console.log(data);
            setCurrency(data.data.symbol);

            //setCategory(data.data.filters[0].values[0].path_from_root);
        };

        const fetchData = () => {
            axios
                .request({
                    method: "get",
                    url: `https://api.mercadolibre.com/items/${productId}`,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    setInfo([response.data]);
                    category(response.data.category_id);
                    currency(response.data.currency_id);
                })
                .catch((error) => {
                    console.log(error);
                });

            axios
                .request({
                    method: "get",
                    url: `https://api.mercadolibre.com/items/${productId}/description`,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    setDescrip([response.data]);
                    //setCategory(response.data.category_id);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchData();
    }, [productId]);

    return (
        <div>
            <div className="row">
                <div className="breadcrumbStyle">
                    <ol className="breadcrumb-edit">
                        {category.map(function (item, index) {
                            return (
                                <li
                                    className="breadcrumb-item-edit"
                                    key={index}
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>

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
                                        <p className="sold">
                                          Nuevo {item.sold_quantity} vendidos
                                        </p>
                                        <h5 className="title">{item.title}</h5>
                                        <p className="price">
                                            {currency}{" "}
                                            {item.price.toLocaleString()}
                                        </p>
                                        <p className="card-text">
                                            <button
                                                type="button"
                                                className="btn-primary-edit btn-lg btn-block"
                                            >
                                                Comprar
                                            </button>
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
                    <div className="row-edit" key={index}>
                        <div className="row"> <h4 className="title-description">Descripcion del producto</h4>      </div>
                        <div className="row">
                        <div className="description" key={item}>
                            {item.plain_text}
                        </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}

export default connect()(ProductDetail);
