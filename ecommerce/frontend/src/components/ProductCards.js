import React, { useEffect, useState } from "react";
import axios from "axios";
// import  useHistory  from "react-router-dom";
import "./ProductCards.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRupee } from "@fortawesome/free-solid-svg-icons";
import {Navigate}  from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductCards = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
    },
  };
  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/addToCart/${productId}`,
        {},
        config
      );
      console.log(response.data);
      navigate("/cart");
      // history.push("/cart"); // Navigate to cart page
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/deleteProductById/${productId}`, config);
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  }
  const getAllProducts = async () => {
    try {
      const GetProducts = await axios.get(
        "http://localhost:4000/getAllproducts"
      );
      setAllProducts(GetProducts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="ProductCardsContainer">
      <CardGroup className="container mt-1 ProductCards">
        {allProducts?.map((product, index) => (
          <div key={index} className=" productCard">
            <Card className="card">
            <div onClick={() => deleteProduct(product._id)} className="deleteIcon">
            <FontAwesomeIcon icon={faTrash} />
            </div>
              <Card.Img
                className="card-img"
                variant="top"
                src={product.image}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Card.Title className="price">
                <FontAwesomeIcon icon={faRupee} />
                  {product.price}</Card.Title>
              
                  <Button
                    className="btn btn-primary "
                    variant="primary"
                    onClick={() => addToCart(product._id)}
                  >
                    <FontAwesomeIcon className="cart" icon={faCartShopping} />{" "}
                    Add to cart
                  </Button>

              </Card.Body>
            </Card>
          </div>
        ))}
      </CardGroup>
    </div>
  );
};

export default ProductCards;
