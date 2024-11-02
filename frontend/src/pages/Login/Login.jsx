import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Using react-toastify for toast notifications
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice.js';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!credentials.username || !credentials.password) {
            toast.error('All fields are required');
            return;
        }

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(login(data)); 
                toast.success('Login successful!');
                setCredentials({ username: '', password: '' }); // Clear fields
                navigate('/menu');
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="heading">Login</h2>
            <div className="form-wrapper">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username..."
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password..."
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;