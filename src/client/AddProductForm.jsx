import './AddProductForm.css';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import DisplayNavbar from './Navbar';
import AddEditSkeleton from './AddEditSkeleton';

export default function AddProductForm() {
    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
        quantity: '',
        imgUrl: '',
        category: ''
    });

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [error, setError] = useState(null); // To track errors from the API

    useEffect(() => {
        // Simulating loading delay
        setTimeout(() => {
            setLoading(false); // After the timeout, load the actual app
        }, 500); // Adjust the delay as per your preference
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const { name, price, quantity, imgUrl, category } = productDetails;

        // Form validation
        if (!name || !price || !quantity || !imgUrl) {
            alert('Please fill in all fields');
            return;
        }

        // API call to add product
        try {
            const response = await fetch('https://freshfromfarm.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, quantity, imgUrl, category }),
            });

            if (!response.ok) {
                throw new Error('Failed to add product. Please try again.');
            }

            const data = await response.json();
            if (data && data._id) {
                // Redirect to the product details page
                navigate(`/show/${data._id}`);
            } else {
                throw new Error('Product ID not returned from the server.');
            }
        } catch (err) {
            console.error('Error:', err);
            alert(err.message);
        }

    }


    function handleChange(evt) {
        const { name, value } = evt.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value

        }));
        console.log(name, value)
    }

    function handleBack() {
        navigate(`/`);
    }

    const categories = [
        {
            value: 'fresh-vegetables',
            label: 'Fresh Vegetables',
        },
        {
            value: 'fresh-fruits',
            label: 'Fresh Fruits',
        },
        {
            value: 'seasonal-picks',
            label: 'Seasonal Picks',
        },
        {
            value: 'leafy-herbs-seasonings',
            label: 'Leafy, Herbs & Seasonings',
        },
        {
            value: 'exotics-premium',
            label: 'Exotics & Premium',
        },
        {
            value: 'organics-hydroponics',
            label: 'Organics & Hydroponics',
        },
        {
            value: 'cuts-sprouts',
            label: 'Cuts & Sprouts',
        },
        {
            value: 'flowers-leaves',
            label: 'Flowers & Leaves',
        },
        {
            value: 'plants-gardening',
            label: 'Plants & Gardening',
        },
        {
            value: 'dried-dehydrated',
            label: 'Dried & Dehydrated',
        },
        {
            value: 'fresh-juices',
            label: 'Fresh Juices',
        },
        {
            value: 'fresh-salads',
            label: 'Fresh Salads',
        },
    ];

    if (loading) {
        return <AddEditSkeleton />
    }

    return (
        <>
            <DisplayNavbar />
            <div className="AddProductForm">

                <div className='form-container'>
                    <h2>Add New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div id="formContainer">
                            <TextField
                                type="text"
                                id="name"
                                name="name"
                                value={productDetails.name}
                                onChange={handleChange}
                                label="Product Name"
                                variant="outlined"
                                size="small"
                                margin="normal"
                            />
                            <TextField
                                id="category"
                                name='category'
                                value={productDetails.category}
                                onChange={handleChange}
                                label="Product Category"
                                margin="normal"
                                size='small'
                                select
                            >
                                {categories.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        className="category-text"
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type="number"
                                id="price"
                                name="price"
                                value={productDetails.price}
                                onChange={handleChange}
                                label="Price"
                                variant="outlined"
                                size="small"
                                margin="normal"
                            />
                            <TextField
                                type="text"
                                id="quantity"
                                name="quantity"
                                value={productDetails.quantity}
                                onChange={handleChange}
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                margin="normal"
                            />
                            <TextField
                                type="text"
                                id="imgUrl"
                                name="imgUrl"
                                value={productDetails.imgUrl}
                                onChange={handleChange}
                                label="Image URL"
                                variant="outlined"
                                size="small"
                                margin="normal"
                            />

                            <Button type="submit" variant="success">Add Product</Button>
                            <Button onClick={handleBack} variant="danger">Back</Button>
                        </div>
                    </form>
                </div>

            </div>
        </>

    );
}
