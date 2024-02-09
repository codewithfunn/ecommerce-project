import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupee } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
    },
  };
  const deleteToCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/deleteCart/${productId}`,
        config // Pass the config object with headers
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting from cart:", error);
      // Handle the error
    }
  };
  const getAllProductsById = async (productId) => {
    try {
      const GetProducts = await axios.get(
        `http://localhost:4000/getProductByID/${productId}`
      );
      return GetProducts.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        };
        const response = await axios.get(
          "http://localhost:4000/cartByuserId",
          config
        );
        setCartData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartData && cartData.items) {
        const productDetailsPromises = cartData.items.map((item) => {
          console.log(item, "item");
          return getAllProductsById(item.product);
        });
        Promise.all(productDetailsPromises)
          .then((products) => {
            setProductDetails(products);
          })
          .catch((error) => {
            setError(error);
          });
      }
    };
    fetchProductDetails();
  }, [cartData]);
  console.log(productDetails, "productDetails");
  return (
    <div className="master-container">
      <div className="card cart">
        <label className="title">Your cart</label>
        <div className="products">
          {cartData ? (
            cartData.items.map((product, index) => {
              console.log(product, "product");
              const product_name = productDetails.find((p) => {
                return p?._id === product?.product;
              });
              console.log(product_name?.name, "product_name");
              return (
                <div key={index} className="product">
                  <div className="delete-product" onClick={() => deleteToCart(product.product)}>
                  <FontAwesomeIcon icon={faTrash} />
                  </div>
                  <div className="product-name">
                    <span>{product_name?.name}</span>
                    <span>product id: {product.product}</span>
                  </div>
                  <div className="product-details">
                    <div className="quantity">
                      <button>
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          height="14"
                          width="14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2.5"
                            stroke="#47484b"
                            d="M20 12L4 12"
                          ></path>
                        </svg>
                      </button>
                      <label>{product.quantity}</label>
                      <button>
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          height="14"
                          width="14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2.5"
                            stroke="#47484b"
                            d="M12 4V20M20 12H4"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    {product_name && (
                      <label className="price small">
                        <FontAwesomeIcon icon={faRupee} />
                        {product_name?.price}
                      </label>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="card coupons">
        <label className="title">Apply coupons</label>
        <form className="form">
          <input
            type="text"
            placeholder="Apply your coupons here"
            className="input_field"
          />
          <button>Apply</button>
        </form>
      </div>

      <div className="card checkout">
        <label className="title">Checkout</label>
        <div className="details">
          <span>Your cart subtotal:</span>
          <span>47.99$</span>
          <span>Discount through applied coupons:</span>
          <span>3.99$</span>
          <span>Shipping fees:</span>
          <span>4.99$</span>
        </div>
        <div className="checkout--footer">
          <label className="price">
            <sup>$</sup>57.99
          </label>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
