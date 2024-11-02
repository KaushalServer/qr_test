import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";
import Restaurant from "../models/restaurant.model.js";

// const /

export const signup = async (req, res) => {
    try {

        const { restaurantName, username, password } = req.body;
        // checked if all required fields are present or not.
        if (!restaurantName || !username || !password) {
            return res.status(403).json({
                error: "All details are required!!"
            });
        }
        // if all the fields are present then us

        const hasedPass = await bcrypt.hash(password, 10);

        // Create the restaurantSlug from the restaurantName
        const restaurantSlug = restaurantName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .trim();

        const newUser = new User({
            username,
            password: hasedPass,
        });

        // Create a new restaurant entry
        const newRestaurant = new Restaurant({
            restaurantName,
            restaurantSlug
        });

        // Save both the user and restaurant in a single operation
        const session = await User.startSession();
        try {
            await session.withTransaction(async () => {
                await newUser.save({ session });
                newRestaurant.user_id = newUser._id;
                await newRestaurant.save({ session });
                newUser.restaurant_id = newRestaurant._id;
                await newUser.save({ session });
            });
        } finally {
            await session.endSession();
        }

        // user created then => entry must be created in restaurent table and the id generated in restaurent should be back in user table for restaurent id for creating a relation
        // generateTokenAndSetCookie(newUser._id, res)
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            restaurant_id: newUser.restaurant_id,
        });

    } catch (error) {
        console.log("Error in signup menu", error.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // for empty fields
        if (!username || !password) {
            return res.status(400).json({
                error: "All fields are requried!!"
            });
        }

        const user = await User.findOne({ username });

        // for checking the password
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // for incorrect password
        if (!isPasswordCorrect) {
            return res.status(404).json({
                message: "Incorrect Password."
            });
        }

        // if everything is right then generate token.
        generateTokenAndSetCookie(user._id, res);

        // Populate the restaurant data
        const restaurant = await Restaurant.findById(user.restaurant_id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            restaurant_id: user.restaurant_id,
            restaurantName: restaurant.restaurantName,
            restaurantSlug: restaurant.restaurantSlug,
        });

    } catch (error) {
        console.log("Error in signin menu", error.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt").status(200).json({
            message: "Signed Out Successful"
        });
    } catch (error) {
        console.log("Error in logout:- ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}