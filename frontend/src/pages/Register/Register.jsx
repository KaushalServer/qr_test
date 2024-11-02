import { useState } from 'react';
import './Register.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [restaurantName, setRestaurantName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that all fields are filled
        if (!restaurantName || !username || !password) {
            toast.error('All fields are required');
            return;
        }

        try {
            // Send request to the signup endpoint
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ restaurantName, username, password }),
            });

            if (response.ok) {
                toast.success('Registration successful!');
                navigate("/login");

                // Reset form fields
                setRestaurantName("");
                setUsername("");
                setPassword("");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2 className="heading">Register Your Restaurant</h2>
            <div className="form-wrapper">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="res-name">Restaurant Name</label>
                        <input 
                            type="text" 
                            id="res-name" 
                            placeholder="Your restaurant name" 
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Enter username..." 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter password..." 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
            </div>
            {/* Toast container to render notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default Register;