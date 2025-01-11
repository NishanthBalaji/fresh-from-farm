import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AddToCart from './AddToCart';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import './ShowProduct.css';
import DisplayNavbar from './Navbar';
import ShowProductSkeleton from './ShowProductSkeleton';

export default function ShowProduct({ product: initialProduct }) {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(initialProduct); // State for the product details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // State to track errors
    const navigate = useNavigate();
    const [showAddToCart, setShowAddToCart] = useState(true);
    const [showCart, setShowCart] = useState(false)

    useEffect(() => {
        // Fetch product details if needed
        if (!initialProduct) {
            const fetchProduct = async () => {
                let url;

                // Check if we are in production or development environment
                if (process.env.NODE_ENV === "production") {
                    // Use production URL
                    url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;
                } else {
                    // Use development URL (localhost)
                    url = `http://localhost:5000/api/products/${id}`;
                }
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Failed to fetch product details');
                    }
                    const data = await response.json();
                    setProduct(data); // Set the fetched product
                } catch (error) {
                    setError(error.message); // Set error message
                } finally {
                    setLoading(false); // Stop loading
                }
            };

            fetchProduct();
        } else {
            setProduct(initialProduct); // Use initial product if available
            setLoading(false); // Stop loading
        }
    }, [id, initialProduct]); // Depend on both id and initialProduct

    const [itemQty, setItemQty] = useState(0);

    useEffect(() => {
        // Fetch cart data from localStorage when component is mounted
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cartData.find(item => item.item === product?.name);
        if (productInCart) {
            setItemQty(productInCart.qty);
        }
    }, [product]);

    const handleAddToCart = () => {
        const newQty = itemQty + 1;
        setItemQty(newQty);
        setShowAddToCart(false);

        // Retrieve existing cart data from localStorage
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cartData.findIndex(item => item.item === product.name);
        if (existingProductIndex >= 0) {
            // Update the quantity of the existing product in the cart
            cartData[existingProductIndex].qty = newQty;
        } else {
            // Add new product to the cart
            cartData.push({ qty: newQty, item: product.name, price: product.price, img: product.imgUrl, weight: product.quantity, id: product._id });
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartData));

        // Call updateCart to notify ProductList
        // updateCart();
        setShowCart(true);
    };

    const handleReduce = () => {
        const newQty = itemQty - 1;
        setItemQty(newQty);

        // Retrieve existing cart data from localStorage
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];

        if (newQty <= 0) {
            // Remove product from the cart if quantity is 0
            const updatedCartData = cartData.filter(item => item.item !== product.name);
            localStorage.setItem('cart', JSON.stringify(updatedCartData));
            if (updatedCartData.length === 0) {
                setShowCart(false); // Hide the cart status if empty
            }
        } else {
            // Update the quantity of the product in the cart
            const existingProductIndex = cartData.findIndex(item => item.item === product.name);
            if (existingProductIndex >= 0) {
                cartData[existingProductIndex].qty = newQty;
                localStorage.setItem('cart', JSON.stringify(cartData));
            }
        }

        // Call updateCart to notify ProductList
        // updateCart();
    };

    if (loading) {
        return <ShowProductSkeleton />
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const redirectToEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        let url;

        // Check if we are in production or development environment
        if (process.env.NODE_ENV === "production") {
            // Use production URL
            url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;
        } else {
            // Use development URL (localhost)
            url = `http://localhost:5000/api/products/${id}`;
        }
        try {
            const response = await fetch(`${url}?_method=DELETE`, { method: 'POST' });
            const data = await response.json();
            if (response.ok && data.redirect) {
                navigate(data.redirect);
            } else {
                console.error('Error deleting product:', data.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error handling delete:', error);
        }
    };

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartQty = 0;

    let cartTotal = 0;


    storedCart.map((item) => {
        cartTotal += (item.qty * item.price)
        cartQty += item.qty;
    });

    return (
        <div id='full-showpage'>
            <DisplayNavbar />
            <div id='card-container'>
                <Card className="card">
                    {/* style={{ width: '430px' }} */}
                    {/* Product Image */}
                    {product.imgUrl && (
                        <Card.Img
                            variant="top"
                            src={product.imgUrl}
                            alt={product.name}
                            className="card-img-top" />
                    )}

                    {/* Product Details */}
                    <div id="product-details">
                        <Card.Body>
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <span style={{ margin: '0 3px' }}>{'>'}</span>
                                <Breadcrumb.Item href={`/product/${product.category}`}>{product.category}</Breadcrumb.Item>
                                <span style={{ margin: '0 3px' }}>{'>'}</span>
                                <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                            </Breadcrumb>
                            <Card.Title>
                                <div className='name-edit'>{product.name}</div>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{product.quantity}</Card.Subtitle>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item className='main-details'>
                                <div className="price-add">
                                    <span id="price">₹{product.price}</span>
                                    <AddToCart
                                        text="Add"
                                        className="add"
                                        handleAddToCart={handleAddToCart}
                                        handleReduce={handleReduce}
                                        itemQty={itemQty}
                                        showAddToCart={itemQty === 0} />
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item className='sub-details'>
                                <div id='product-highlights'>Product Highlights</div>
                            </ListGroup.Item>

                            {/* Accordion Section */}

                            <ListGroup.Item className='sub-details'>
                                <Accordion id='accordion' sx={{
                                    boxShadow: 'none', // Removes shadow
                                    backgroundColor: 'transparent', // Removes background color
                                    '--Paper-shadow': 'none', // Removes the inline shadow variable
                                    border: 'none',
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{
                                            margin: '20px'
                                        }}
                                    >
                                        About Product
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul>
                                            <li><span className='bold-text'>Description:</span> {product.description || "No description available."}</li>
                                            <li><span className='bold-text'>Country of Origin:</span> {product.origin || "Not specified"}</li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </ListGroup.Item>







                            <ListGroup.Item className='edit-button'>
                                <Button variant="warning" onClick={redirectToEdit}>Edit Item</Button>
                            </ListGroup.Item>

                            <ListGroup.Item className='delete-button'>
                                <form action={`http://localhost:5000/api/products/${id}?_method=DELETE`} method="POST">
                                    <Button onClick={handleDelete} variant="danger" type="submit">Delete</Button>
                                </form>
                            </ListGroup.Item>

                        </ListGroup>
                    </div>

                </Card>
                {cartQty > 0 &&

                    <div id="cart-status">
                        <a href="/cart" id="cart-button">
                            <div id="view-cart">
                                <p>{cartQty} Items | ₹{cartTotal} </p>
                                <p><ShoppingBagOutlinedIcon /> View Cart</p>
                            </div>
                        </a>
                    </div>
                }
            </div>
        </div>

    );
}
