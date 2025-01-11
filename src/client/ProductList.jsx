import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DisplayNavbar from "./Navbar";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CategoryList from "./CategoryList";

import ProductListSkeleton from "./ProductListSkeleton";



export default function ProductList() {
    const { category } = useParams(); // Get category name from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productStates, setProductStates] = useState({});// Store states for each product

    const [showCart, setShowCart] = useState(false)

    const navigate = useNavigate();



    useEffect(() => {

        const initializeCart = () => {
            // Fetch cart data from localStorage on component mount
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Initialize productStates based on the stored cart data
            const initialProductStates = {};
            storedCart.forEach(item => {
                initialProductStates[item.item] = {
                    itemQty: item.qty,
                    showAddToCart: false,
                };
            });

            setProductStates(initialProductStates);
            setShowCart(storedCart.length > 0); // Show cart if there are items in the cart
        };

        const fetchProducts = async () => {
            // console.log("Category from URL:", category);
            let url;
            if (process.env.NODE_ENV === "production") {
                // Use production URL
                url = `https://freshfromfarm.onrender.com/api/products`;
            } else {
                // Use development URL (localhost)
                url = "http://localhost:5000/api/products";
            }
            if (category && category !== "all") {
                url += `?category=${category}`;
            }
            console.log("Fetching URL:", url);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error fetching products");
                }
                const data = await response.json();
                console.log("Fetched Products:", data); // Log the fetched products
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);

        initializeCart(); // Initialize the cart from localStorage
        fetchProducts(); // Fetch products from the API
    }, [category]); // Re-fetch when the category changes

    if (loading) {
        return <ProductListSkeleton />
    }


    let noProducts = false;
    if (products.length === 0) {
        noProducts = true;
    }
    // Function to handle adding a product to the cart
    const handleAddToCart = (product) => {
        setProductStates((prevStates) => {
            const newQty = (prevStates[product.name]?.itemQty || 0) + 1;
            const newProductStates = {
                ...prevStates,
                [product.name]: {
                    itemQty: newQty,
                    showAddToCart: false,
                },
            };

            const cartData = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cartData.findIndex(item => item.item === product.name);

            if (existingProductIndex >= 0) {
                cartData[existingProductIndex].qty = newQty;
            } else {
                cartData.push({ item: product.name, qty: newQty, price: product.price, img: product.imgUrl, weight: product.quantity, id: product._id });
            }
            localStorage.setItem('cart', JSON.stringify(cartData));
            return newProductStates;
        });

        // Set showCart to true when any product is added to the cart
        setShowCart(true);
    };

    // Function to handle reducing a product quantity in the cart
    // 

    const handleReduce = (product) => {
        setProductStates((prevStates) => {
            const newQty = (prevStates[product.name]?.itemQty || 1) - 1;
            const newProductStates = {
                ...prevStates,
                [product.name]: {
                    itemQty: newQty <= 0 ? 0 : newQty,
                    showAddToCart: newQty <= 0,
                },
            };

            // Update localStorage
            const cartData = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cartData.findIndex(item => item.item === product.name);

            if (newQty <= 0) {
                // Remove product from cart
                const updatedCartData = cartData.filter(item => item.item !== product.name);
                localStorage.setItem('cart', JSON.stringify(updatedCartData));

                // Check if the cart is empty after removal
                if (updatedCartData.length === 0) {
                    setShowCart(false); // Hide the cart status if empty
                }
            } else if (existingProductIndex >= 0) {
                cartData[existingProductIndex].qty = newQty;
                localStorage.setItem('cart', JSON.stringify(cartData));
            }

            const isCartNotEmpty = cartData.length > 0;
            setShowCart(isCartNotEmpty);


            return newProductStates;
        });
    };


    const addProductForm = () => {
        navigate("/add");
    };

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartQty = 0

    let cartTotal = 0;


    storedCart.map((item) => {
        cartTotal += (item.qty * item.price)
        cartQty += item.qty;
    });



    let realCategory = category.replace(/\b\w/g, char => char.toUpperCase());

    let showOnlyAll = true;

    if (realCategory != "All") {
        showOnlyAll = false;
    }

    return (

        <div className="ProductList">
            <DisplayNavbar />

            <div id="bread">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <span style={{ margin: '0 3px' }}>{'>'}</span>
                    <Breadcrumb.Item href={`/product/${category}`}>Fruits & Vegetable</Breadcrumb.Item>
                    <span style={{ margin: '0 3px' }}>{'>'}</span>
                    <Breadcrumb.Item active>{realCategory}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div id="product-category">
                {showOnlyAll ? <p>{realCategory}</p> : <p>Buy {realCategory} Online</p>}
            </div>


            {/* <button id="newButton" onClick={addProductForm} className="btn btn-primary">
                Add New Item
            </button> */}
            <div className="category-product">

                <CategoryList />
                {
                    noProducts
                        ?
                        <div className="no-products">
                            <h1>No Products In This Category</h1>
                        </div>
                        :
                        <div >

                            <div id="for-pc">
                                <div id="product-category-pc">
                                    {showOnlyAll ? <h3>{realCategory}</h3> : <h3>Buy {realCategory} Online</h3>}
                                </div>

                                <div className="ProductListView">
                                    {products.map((product) => {
                                        const productState = productStates[product.name] || { itemQty: 0, showAddToCart: true };
                                        return (
                                            <Product
                                                key={product._id}
                                                product={product}
                                                handleAddToCart={handleAddToCart}
                                                handleReduce={handleReduce}
                                                itemQty={productState.itemQty}
                                                showAddToCart={productState.showAddToCart}
                                                setShowCart={setShowCart}
                                            />

                                        );

                                    })}
                                </div>

                            </div>



                        </div>

                }

            </div>
            {showCart &&
                <div id="cart-status" >
                    <a href="/cart" id="cart-button">
                        <div id="view-cart">
                            <p>{cartQty} Items | ₹{cartTotal} </p>
                            <p><ShoppingBagOutlinedIcon /> View Cart</p>
                        </div>
                    </a>
                </div>
            }
        </div>
    );
}