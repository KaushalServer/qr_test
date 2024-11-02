import Menu from "../models/menu.model.js";
import Restaurant from "../models/restaurant.model.js";

export const addItem = async (req, res) => {
    // will be adding items to the cluster
    try {
        // console.log(req.body);
        
        const { item_name, item_price_full, item_price_half, item_image, restaurant_id } = req.body;

        // checking for user
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: "Unauthorised User.."
            });
        }

        const userId = req.user._id;
        // console.log("Line 18:-",req.user);
        

        // checked for new item name
        if (!item_name) {
            return res.status(400).json({
                success: false,
                error: "Item name is required"
            });
        }

        // checked new item price
        if (!item_price_full) {
            return res.status(400).json({
                success: false,
                error: "Item Price is required"
            });
        }

        // checked restaurant based on restaurant_id
        const restaurant = await Restaurant.findById(restaurant_id);

        if (!restaurant) {
            return res.status(400).json({
                success: false,
                error: "Restaurant name is required"
            });
        }
        // item_image = "";

        const newItem = new Menu({
            item_name,
            item_price_full,
            item_price_half,
            restaurant_id,
            user_id: userId,
            // item_image, // add krna hai
        });
        // console.log(" yahaan tak aaye????");


        await newItem.save();

        return res.status(201).json({
            success: true,
            message: "Item added successfully"
        });

    } catch (error) {
        console.log("Error in add item:- ", error.message);
        res.status(500).json({
            success: false,
            error: "Error while adding item"
        });
    }
}

export const updateItem = async (req, res) => {

}


export const deleteItem = async (req, res) => {

}

export const getMenu = async (req, res) => {
    // we have to check that call kahan se aa rhi hai well this should be open to all
    // based restaurent id or restaurant name neither user_id or user name check or anything.
    // if taken to consideration getMenu call will come from two points
    // 1) from user jo items add kr rha hoga. ---> done
    // 2) jab url params mein restaurant name hoga. ---> done

    try {
        // console.log("Idher call ayi");

        // console.log("Yeh hai undefined",req.user);
        if (req.user) {
            const restaurant_id = req.user.restaurant_id;
            const menus = await Menu.find({ restaurant_id });
            return res.status(200).json({
                success: true,
                data: menus
            });
        }

        // url condition
        // console.log(req.body);

        const { restaurantSlug } = req.body;
        // console.log("Slug hai:- ", restaurantSlug);

        const restaurant = await Restaurant.findOne({ restaurantSlug });
        // console.log(restaurant);


        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const restaurant_id = restaurant._id;

        const menus = await Menu.find({ restaurant_id });
        return res.status(200).json({
            success: true,
            data: menus
        });

    } catch (error) {
        console.log("Error in Getting Menu data:- ", error.message);

        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}