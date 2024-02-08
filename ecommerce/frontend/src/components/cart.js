import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css';

const CartCom = () => {
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token'),
      },
    };
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/cartByuserId', config);
        setCartData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);
  return (
    <div class="master-container">
  <div class="card cart">
    <label class="title">Your cart</label>
    <div class="products">
    {cartData ? ( 
      cartData.items.map((product) => ( 
      <div key={product._id} class="product">
        <div>
          <span>{product.product}</span>
        </div>
        <div class="quantity">
          <button>
            <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
            </svg>
          </button>
          <label>{product.quantity}</label>
          <button>
            <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
            </svg>
          </button>
        </div>
        <label class="price small">{product.price}</label>
      </div>
      ))) : (<p>Loading...</p>)}
    </div>
  </div>

  <div class="card coupons">
    <label class="title">Apply coupons</label>
    <form class="form">
        <input type="text" placeholder="Apply your coupons here" class="input_field"/>
        <button>Apply</button>
    </form>
  </div>

  <div class="card checkout">
    <label class="title">Checkout</label>
    <div class="details">
      <span>Your cart subtotal:</span>
      <span>47.99$</span>
      <span>Discount through applied coupons:</span>
      <span>3.99$</span>
      <span>Shipping fees:</span>
      <span>4.99$</span>
    </div>
    <div class="checkout--footer">
      <label class="price"><sup>$</sup>57.99</label>
      <button class="checkout-btn">Checkout</button>
    </div>
  </div>
</div>
  );
};
export default CartCom;
