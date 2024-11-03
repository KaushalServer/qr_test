import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { selectLoggedInUser } from '../../store/user/userSlice.js';
import MenuItem from '../../components/MenuItem/MenuItem.jsx';
import "./Menu.css";
import "./Modal.css";
import burgerImage from '../../assets/burger.jpeg';

const Menu = () => {

    const initialFormData = {
        item_name: '',
        item_price_full: '',
        item_price_half: '',
        item_image: null,
    };

    const [menuData, setMenuData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showHalfPriceInput, setShowHalfPriceInput] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [menuUpdated, setMenuUpdated] = useState(false);

    const currentUser = useSelector(selectLoggedInUser);
    const restaurantName = currentUser.user.restaurantName;
    // console.log(currentUser);
    

    const handleToggleHalfPrice = () => setShowHalfPriceInput(!showHalfPriceInput);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMenuUpdated(false);

        const { item_name, item_price_full } = formData;
        if (!item_name || !item_price_full) {
            toast.error("Item name and price are required.");
            return;
        }

        try {
            const restaurant_id = currentUser.user.restaurant_id;
            const response = await fetch('/api/menu/add-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, restaurant_id }),
                credentials: "include",
                mode: 'cors',
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                setMenuUpdated(true);
            } else {
                toast.error(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }

        setShowModal(false);
        setFormData(initialFormData);
        setShowHalfPriceInput(false);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('/api/menu/get-menu', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                mode: 'cors',
            });
            if (response.ok) {
                const data = await response.json();
                setMenuData(data.data);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [menuUpdated]);

    return (
        <div className="menu-container">
            <div className="user-info">
                {currentUser.user && (
                    <>
                        <img src={currentUser.user.image ?? burgerImage} alt={currentUser.user.username} className="user-icon" />
                        <span className="username">{currentUser.user.username}</span>
                    </>
                )}
            </div>
            <h1 className="menu-heading">{restaurantName} Menu</h1>
            <div className="menu-items-wrapper">
                {menuData.map(item => (
                    <MenuItem key={item._id}
                        name={item.item_name}
                        price_full={item.item_price_full}
                        price_half={item.item_price_half}
                        image={item.item_image}
                    />
                ))}
            </div>
            <button className="menu-button" onClick={() => setShowModal(true)}>Add More</button>
            <button className="menu-button" disabled>Generate QR</button>

            {showModal && (
                <div className="modal-overlay" aria-hidden={!showModal}>
                    <div className="modal-content">
                        <h2>Add New Food Item</h2>
                        <form className="add-food-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="item_name">Food Name</label>
                                <input
                                    type="text"
                                    id="item_name"
                                    name="item_name"
                                    value={formData.item_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter food name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="item_price_full">{showHalfPriceInput ? 'Full Price' : 'Price'}</label>
                                <input
                                    type="text"
                                    id="item_price_full"
                                    name="item_price_full"
                                    value={formData.item_price_full}
                                    onChange={handleInputChange}
                                    placeholder={showHalfPriceInput ? 'Enter full price' : 'Enter price'}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={showHalfPriceInput}
                                        onChange={handleToggleHalfPrice}
                                    />
                                    Half Price Available
                                </label>
                            </div>
                            {showHalfPriceInput && (
                                <div className="form-group">
                                    <label htmlFor="item_price_half">Half Price</label>
                                    <input
                                        type="text"
                                        id="item_price_half"
                                        name="item_price_half"
                                        value={formData.item_price_half}
                                        onChange={handleInputChange}
                                        placeholder="Enter half price"
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="item_image">Image</label>
                                <input
                                    type="file"
                                    id="item_image"
                                    name="item_image"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="submit-btn">Add Item</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Menu;