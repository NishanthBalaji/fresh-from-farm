import './Product.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddToCart from './AddToCart';

export default function Product({ product, cart, handleAddToCart, handleReduce, itemQty, setShowCart }) {

    let newProductQty = '';
    // Find the current product in the cart to get its quantity
    const foundItem = product?.someArray?.find(item => item.someCondition);

    const handleAddToCartInternal = () => {
        handleAddToCart(product); // Call the parent function to handle add to cart
        setShowCart(true); // Update the showCart state in ProductList
    };

    if (product.quantity.length > 19) {
        newProductQty = product.quantity.slice(0, 19);
    }
    else {
        newProductQty = product.quantity;
    }

    return (
        <Card style={{ width: '100%', height: '100%', padding: 0 }} className="card">
            <a href={`/show/${product._id}`}>
                <div className="image-container">
                    <img
                        src={product.imgUrl}
                        alt={`${product.name} image`}
                    />
                </div>
                <Card.Body>
                    <Card.Title className="product-title">{product.name}</Card.Title>
                    <Card.Text>
                        <span id='product-qty'>{newProductQty}</span>
                        <span id='price'>₹{product.price}</span>
                    </Card.Text>
                </Card.Body>
            </a>
            <AddToCart
                text="Add To Cart"
                className="addToCart"
                handleAddToCart={handleAddToCartInternal}
                handleReduce={() => handleReduce(product)}
                itemQty={itemQty}
                showAddToCart={itemQty === 0}
            />
        </Card>
    );
}
