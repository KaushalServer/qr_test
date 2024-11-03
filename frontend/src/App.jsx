import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { selectLoggedInUser } from './store/user/userSlice';
import Menu from './pages/Menu/Menu.jsx';
import { useSelector } from 'react-redux';
import ResaturantMenu from './components/RestaurantMenu/RestaurantMenu.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import { useState } from 'react';

function App() {

  const currentUser = useSelector(selectLoggedInUser);
  // console.log(currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={currentUser.user !== null ? <Menu /> : <Navigate to="/login" replace />} />
        <Route path="/:restaurantSlug/menu" element={<ResaturantMenu />} />
      </Routes>
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </Router>
  )
}

export default App
