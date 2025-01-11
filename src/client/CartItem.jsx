import React, { useState } from 'react';
import './CartItem.css'
import AddToCart from './AddToCart';

export default function CartItem({ product, updateCart }) {
    const [itemQty, setItemQty] = useState(product.qty);

    const handleAddToCart = () => {
        const newQty = itemQty + 1;
        setItemQty(newQty);
        updateCart(product.id, newQty); // Notify parent to update storedCart and localStorage
    };

    const handleReduce = () => {
        const newQty = itemQty - 1;
        if (newQty >= 0) {
            setItemQty(newQty);
            updateCart(product.id, newQty); // Notify parent to update storedCart and localStorage
        }
    };

    return (
        <div className="CartItem">
            <img id='product-img' src={product.img} alt={product.item} />
            <div id='name-weight'>
                <p id='product-name'>{product.item}</p>
                <p id='product-weight'>{product.weight}</p>
            </div>

            <AddToCart
                text="Add"
                className="add"
                handleAddToCart={handleAddToCart}
                handleReduce={handleReduce}
                itemQty={itemQty}
                showAddToCart={itemQty === 0}
            />
            <div id='product-price'>
                <p>₹{product.price * itemQty}</p>
            </div>

        </div>
    );
}
