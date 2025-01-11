import React, { useState, useEffect } from 'react';
import './Cart.css'
import CartItem from './CartItem';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [storedCart, setStoredCart] = useState([]);
    const [ordered, setOrdered] = useState(false); // State for order status
    const [deliveryFree, setDeliveryFree] = useState(false);
    const [forFreeDelivery, setForFreeDelivery] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setStoredCart(cart);
    }, []);

    // Function to update the cart state and sync with local storage
    const updateCart = (productId, newQty) => {
        const updatedCart = storedCart
            .map((product) =>
                product.id === productId ? { ...product, qty: newQty } : product
            )
            .filter((product) => product.qty > 0); // Remove items with qty = 0
        setStoredCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    let cartEmpty = storedCart.length === 0;

    const navigate = useNavigate();

    // Navigate to Add Product form


    // Navigate back to previous page
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };


    const handlePlaceOrder = () => {
        setOrdered(true);
        setStoredCart([]); // Clear the cart state
        localStorage.removeItem('cart'); // Clear the cart from localStorage
    }

    useEffect(() => {
        if (ordered) {
            const timer = setTimeout(() => {
                setShowText(true);
            }, 900); // Wait 3 seconds before showing the text

            // Clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [ordered]);

    let cartQty = 0

    let cartTotal = 0;




    storedCart.map((item) => {
        cartTotal += (item.qty * item.price)
        cartQty += item.qty;
    });

    const [deliveryFee, setDeliveryFee] = useState(0);
    useEffect(() => {
        if (cartTotal > 199) {
            setDeliveryFree(true);
            setDeliveryFee(0);
        } else {
            setDeliveryFree(false);
            setForFreeDelivery(200 - cartTotal);
            setDeliveryFee(Math.floor(cartTotal * 0.2))
        }
    }, [cartTotal]);


    let toPay = Math.floor(cartTotal + deliveryFee + 9.99);





    return (
        <div>
            {ordered
                ?
                <div className='ordered'>
                    <div className="wrapper"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>

                    </div>
                    {showText
                        &&
                        <div className="order-success-text">
                            <h2>Order Placed Successfully!</h2>
                            <a href="/product/all" className="order-again-link">
                                Order Again
                            </a>
                        </div>
                    }
                </div>
                :
                <>

                    <Navbar expand="lg" className="bg-body-tertiary">
                        <div className="cartNavbar">
                            <a id="back" onClick={handleBack}>
                                <ArrowBackIosNewIcon />
                            </a>
                            <Navbar.Brand id="your-cart">
                                <p>Your Cart</p>
                            </Navbar.Brand>

                        </div>
                    </Navbar>

                    <div className="cart">
                        {cartEmpty ? (
                            <div className="empty-cart">
                                <h1>Your Cart Is Empty</h1>
                                <a href="/product/all">Shop Product</a>
                            </div>
                        ) : (
                            <>
                                <div className="valid-cart">
                                    <div id="cart-heading">
                                        <img src="https://res.cloudinary.com/dkywndf0x/image/upload/v1735565441/time_p2kl1i.webp" alt="clock-img" />
                                        <p>Delivery in 15 mins</p>
                                    </div>
                                    <div id="cart-items">
                                        {storedCart.map((product) => (
                                            <CartItem
                                                key={product.id} product={product}
                                                updateCart={updateCart}
                                            />
                                        ))}
                                    </div>
                                    <div className="missing">
                                        <p>Missing something?</p>
                                        <a href="/product/all">+ Add More Items</a>
                                    </div>
                                </div>

                                <div className="bill">
                                    <div id="bill-icon">
                                        <img src="https://res.cloudinary.com/dkywndf0x/image/upload/v1735885778/bill_icon_usvfvb.avif" alt="bill icon" />
                                    </div>
                                    <div id="pay-text">
                                        <p id='to-pay'>To Pay</p>
                                        <p id='total'>Incl. of all taxes and charges</p>
                                    </div>
                                    <div id="pay-amount">
                                        <p>₹{toPay}</p>
                                    </div>
                                    <a id="bill-details" onClick={handleShow}>
                                        <ArrowForwardIosIcon />
                                    </a>
                                    <Offcanvas show={show} onHide={handleClose} placement="bottom">
                                        <Offcanvas.Header closeButton>
                                            <img src="https://res.cloudinary.com/dkywndf0x/image/upload/v1735885778/bill_icon_usvfvb.avif" alt="bill icon" />
                                            <Offcanvas.Title>Bill Summary</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body style={{ paddingTop: deliveryFree ? '20px' : '0px' }}>
                                            <div className='offcanvas-content' id='itemTotal'>
                                                <p>Item Total</p>
                                                <p>₹{cartTotal}</p>
                                            </div>
                                            <div className='offcanvas-content' id='handlingCharge'>
                                                <p>Handling Charge</p>
                                                <p>₹9.99</p>
                                            </div>
                                            {deliveryFree
                                                ?
                                                <div className='offcanvas-content' id='deliveryFee'>
                                                    <p>Delivery Fee</p>
                                                    <p>₹0</p>
                                                </div>
                                                :
                                                <>
                                                    <div className='offcanvas-content' id='deliveryFee'>

                                                        <p>Delivery Fee</p>
                                                        <p>₹{deliveryFee}</p>
                                                    </div>

                                                    <div >
                                                        <p id='green-text'>Add products worth <span>₹{forFreeDelivery}</span> to get free delivery</p>
                                                    </div>
                                                </>


                                            }

                                            <div className='offcanvas-content' id='canvasFooter'>
                                                <div id="pay-text">
                                                    <p id='to-pay-inside'>To Pay</p>
                                                    <p id='total-inside'>Incl. of all taxes and charges</p>
                                                </div>
                                                <div id="pay-amount">
                                                    <p>₹{toPay}</p>
                                                </div>
                                            </div>

                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </div>


                                <div id='order-button'>
                                    <button onClick={handlePlaceOrder}>Place Order | ₹{toPay}</button>
                                </div>
                            </>
                        )}

                    </div>
                </>
            }

        </div>

    );
}


