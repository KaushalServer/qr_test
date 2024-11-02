import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
        minLength: 6,
    },
    restaurant_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant'
    }, // Reference to Restaurant
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;