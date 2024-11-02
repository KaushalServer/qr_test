import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true,
        unique: true,
    },
    item_price_full: {
        type: Number,
        required: true,
        min: 0,
    },
    item_price_half: {
        type: Number,
        default: null,
        min: 0,
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true // If it's mandatory to have a user associated
    },
    item_image: {
        type: String, // URL of the image
        default: null // or a placeholder image URL
    },
}, { timestamps: true });


const Menu = mongoose.model('Menu', menuSchema);

export default Menu;