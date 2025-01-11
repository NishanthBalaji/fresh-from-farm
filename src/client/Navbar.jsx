import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import './Navbar.css';

export default function DisplayNavbar() {

    const navigate = useNavigate();

    // Navigate to Add Product form
    const addProductForm = () => {
        navigate("/product/add");
    };

    // Navigate back to previous page
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    // const areas = ["Pallikaranai, Chennai", "New Washermenpet, Chennai", "Medavakkam, Chennai", "Adyar, Chennai", "Velachery, Chennai", "Tambaram, Chennai"]

    // // const random = Math.floor(Math.random() * areas.length);

    // const deliArea = areas[Math.floor(Math.random() * areas.length)];

    // const deliTime = Math.floor(Math.random() * 10 + 5)

    return (

        <Navbar expand="lg" className="bg-body-tertiary">

            <div className="fullNavbar">
                <a id="back" onClick={handleBack}>
                    <ArrowBackIosNewIcon />
                </a>
                <div id="details">
                    <Navbar.Brand id="delivery">
                        Delivery in <span id="time">12 Mins</span>
                    </Navbar.Brand>
                    <Navbar.Brand id="location">Pallikaranai, Chennai</Navbar.Brand>
                </div>
                <div>
                    <button
                        id="newButton"
                        onClick={addProductForm}
                        className="btn btn-primary"
                    >
                        Add New Item
                    </button>
                </div>
                <div id="cart-icon">
                    <a href="/cart">
                        <IconButton aria-label="cart">
                            <ShoppingCartIcon />
                        </IconButton>
                    </a>
                </div>
            </div>

        </Navbar>

    );
}
