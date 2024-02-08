import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from 'axios';


const ManageProduct = () => {
  const [image, setimage]= useState('');
  const [name, setName]= useState('');
  const [price, setPrice]= useState(0);
  const [quantity, setQuantity]= useState(0);
  const [category,setcategory]= useState('');
  const [rating, setrating]= useState(0);
  const [comments, setComments]= useState([]);
  const [allproducts, setallproducts] = useState([]);
  const [alladdproducts, setalladdproducts] = useState({
    name: '',
    price: 0,
    quantity: 0,
    category: '',
    image: '',
    rating: 0,
    comments: [],
  });

  const [editProduct, setEditProduct] = useState(null);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token'),
    },
  };

  const handleImageupload = async () => {
    try {
      const formdata = new FormData()
      formdata.append('file',image)
      //  console.log(formdata)
      const response = await axios.post("http://localhost:4000/uploadFile", formdata)
      // console.log(formdata)
      return response;
    }
    catch (err) {
      console.log(err)
    }
  }

  const addProduct = async (e) => {
    try {
      e.preventDefault()
      const ImageRes = await handleImageupload();
      console.log(ImageRes);
      const resp = await axios.post('http://localhost:4000/addProduct', 
      {name: name,
      price: price,
      quantity: quantity,
      category: category,
      image: `http://localhost:4000/files/${ImageRes.data.fileName}`,
      rating: rating,
      comments: comments}, config);
      getAllProducts();
      
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    try {
      await axios.put(`http://localhost:4000/editProductById/${productId}`, updatedProduct);
      getAllProducts();
      setEditProduct(null); // Clear edit mode
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/deleteProductById/${productId}`, config);
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const GetProducts = await axios.get('http://localhost:4000/getAllproducts');
      setallproducts(GetProducts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setalladdproducts({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      image: product.image,
      rating: product.rating,
      comments: product.comments,
    });

  };

  const handleCancelEdit = () => {

    setEditProduct(null);
    setalladdproducts({
      name: '',
      price: 0,
      quantity: 0,
      category: '',
      image: '',
      rating: 0,
      comments: [],
    });
  };

  return (
    <Container className="m-5">
      <div>
        <h2 className='m-2'>{editProduct ? 'Edit Product' : 'Add a New Product'}</h2>
        {/* <form>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e) => setName( e.target.value )} />

          <label>Price:</label>
          <input
            type='number' value={price} onChange={(e) => setPrice( e.target.value )} />

          <label>Quantity:</label>
          <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value )} />

          <input type="file" name='file' onChange={(e)=> setimage(e.target.files[0])}/>
          {editProduct ? (
            <>
              <Button className='btn btn-success m-1' onClick={() => updateProduct(editProduct._id, alladdproducts)}>
                Update Product
              </Button>
              <Button className='btn btn-warning m-1' onClick={handleCancelEdit}>
                Cancel Edit
              </Button>
            </>
          ) : (
            <Button className='btn btn-info m-1' onClick={addProduct}>
              Add Product
            </Button>
          )}
        </form> */}
        <form action="" className="form">
          <input required="" className="input" type="text" name="name" id="name" placeholder="Product Name"  value={name} onChange={(e) => setName( e.target.value )} />
          <input required="" className="input" type="number" name="price" id="price" placeholder="Product Price" value={price} onChange={(e) => setPrice( e.target.value )} />
          <input required="" className="input" type="number" name="quantity" id="quantity" placeholder="Product quantity"value={quantity} onChange={(e) => setQuantity(e.target.value )}/>
         <input required='' className='input' type="file" name='file' onChange={(e)=> setimage(e.target.files[0])}/>
         {editProduct ? (
            <>
              <Button className='login-button' onClick={() => updateProduct(editProduct._id, alladdproducts)}>
                Update Product
              </Button>
              <Button className='login-button' onClick={handleCancelEdit}>
                Cancel Edit
              </Button>
            </>
          ) : (
            <Button className='login-button' onClick={addProduct}>
              Add Product
            </Button>
          )}
        </form>

        {/* Display the list of products */}
        <CardGroup className='container ProductCard'>
          {allproducts &&
            allproducts.map((product, index) => (
              <div key={index} className='col-lg-4 col-md-4 col-sm-6'>
                <Card className='card'>
                  <Card.Img className='card-img' variant='top' src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Card.Title>{product.price}</Card.Title>
                    <Button className='btn btn-success m-1' onClick={handleEditClick}>
                      Edit
                    </Button>
                    <Button className='btn btn-danger m-1' onClick={() => deleteProduct(product._id)}>
                      Delete
                    </Button>

                  </Card.Body>
                </Card>
              </div>
            ))}
        </CardGroup>
      </div>
    </Container>
  );
};

export default ManageProduct;
