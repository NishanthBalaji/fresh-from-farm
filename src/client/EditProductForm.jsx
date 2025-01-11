import './AddProductForm.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './EditProductForm.css'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from 'react-bootstrap/Button';
import DisplayNavbar from './Navbar';
import AddEditSkeleton from './AddEditSkeleton';


export default function EditProductForm() {
    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
        quantity: '',
        imgUrl: ''
    });

    const navigate = useNavigate();

    const [error, setError] = useState(null); // To track errors from the API
    const [loading, setLoading] = useState(true)

    const { id } = useParams(); // Get the product ID from the URL
    // console.log('Edit page for product with ID:', id);


    useEffect(() => {
        const fetchProduct = async () => {

            let url;

            // Check if we are in production or development environment
            if (process.env.NODE_ENV === "production") {
                // Use production URL
                url = `https://freshfromfarm.onrender.com/api/products/${id}`;
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
                setProductDetails(data); // Populate the form with fetched product details
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchProduct();
    }, [id]);

    if (!productDetails) {
        return <h2>Product not found</h2>;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { name, price, quantity, imgUrl } = productDetails;

        // Form validation
        if (!name || !price || !quantity || !imgUrl) {
            alert('Please fill in all fields');
            return;
        }

        let url;

        // Check if we are in production or development environment
        if (process.env.NODE_ENV === "production") {
            // Use production URL
            url = `https://freshfromfarm.onrender.com/api/products/${id}`;
        } else {
            // Use development URL (localhost)
            url = `http://localhost:5000/api/products/${id}`;
        }

        // API call to add product
        try {
            const response = await fetch(url, {
                method: 'PUT', // Update product using PUT or PATCH
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, quantity, imgUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to update product. Please try again.');
            }

            // alert('Product updated successfully!');
            navigate(`/show/${id}`); // Redirect to the product details page
        } catch (err) {
            console.error('Error:', err);
            alert(err.message);
        }
        finally {
            setLoading(false); // Stop loading
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value

        }));
    }

    function handleBack() {
        navigate(`/${id}`);
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

            <div className="EditProductForm">
                <div className='form-container'>
                    <h2>Edit Product Details</h2>
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
                                id="outlined-select-currency"
                                select
                                label="Product Category"
                                defaultValue={productDetails.category}
                                margin='normal'
                                size='small'
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
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

                            <Button type="submit" variant="success">Update Product</Button>
                            <Button onClick={handleBack} variant="danger">Back</Button>
                        </div>
                    </form>

                </div>

            </div>
        </>

    );
}
