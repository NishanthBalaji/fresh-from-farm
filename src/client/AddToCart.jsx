import Button from 'react-bootstrap/Button';
import './AddToCart.css'

export default function AddToCart({ text, className, handleAddToCart, handleReduce, itemQty, showAddToCart }) {
    return (
        <div className={className} >
            {showAddToCart ? (
                <button id="addToCart" onClick={handleAddToCart}>{text}</button>
            ) : (
                <>
                    <Button id="reduce" onClick={handleReduce}>-</Button>
                    <Button id="cartQty">{itemQty}</Button>
                    <Button id="increase" onClick={handleAddToCart}>+</Button>
                </>
            )}
        </div>
    );
}

