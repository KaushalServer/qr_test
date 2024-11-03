// LandingPage.js
import React from 'react';
import './LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    // console.log("Variable ki value:- ",isLoggedIn);
    

    const isLoggedIn = false; // Change this based on your app's authentication state
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (isLoggedIn) {
            // Redirect to the menu page if the user is logged in
            navigate('/menu');
        } else {
            // Optionally, you can show an alert or a message
            alert('Please log in or register to access the menu.');
        }
    };

    return (
        <div
            className="dark-landing-page">
            <div className="full-page-bg"></div>
            <header className="dark-hero">
                <h1>Scan. Browse. Enjoy Your Meal.</h1>
                <p>Get instant access to restaurant menus by scanning a QR code.</p>
                {isLoggedIn ? (
                    <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
                ) : (
                    <div>
                        <Link to="/register">
                            <button className="cta-button">Register</button>
                        </Link>
                        <Link to="/login">
                            <button className="cta-button">Login</button>
                        </Link>
                    </div>
                )}
            </header>

            <section className="dark-features">
                <div className="feature">
                    <h2>Features</h2>
                    <p>Explore menus from various restaurants with a single scan.</p>
                </div>
                <div className="feature">
                    <h2>Pricing</h2>
                    <p>Flexible plans for every restaurant size.</p>
                </div>
                <div className="feature">
                    <h2>Contact Us</h2>
                    <p>Have questions? We're here to help.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
