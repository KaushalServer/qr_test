import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
    },
    restaurantSlug: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

// // Pre-save middleware to create the restaurantSlug
// restaurantSchema.pre('save', function (next) {
//     // Generate slug from restaurantName
//     this.restaurantSlug = this.restaurantName
//         .toLowerCase() // Convert to lowercase
//         .replace(/\s+/g, '-') // Replace spaces with hyphens
//         .replace(/[^\w\-]+/g, '') // Remove all non-word chars
//         .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
//         .trim(); // Trim any leading or trailing hyphens

//     next(); // Proceed to save the document
// });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;