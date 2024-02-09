import React from 'react'
import ProductCards from '../components/ProductCards';
const Product = () => {
  return (
    <div className='ourProducts py-lg-4 d-flex flex-column  justify-content-center  '>
    {/* <ProductCom/> */}
    <div className='text-center'>
      <h2>Our Products</h2>
    </div>
      <ProductCards/>
    </div>
  )
}

export default Product;