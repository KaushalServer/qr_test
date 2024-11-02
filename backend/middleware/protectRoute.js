import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // console.log(req);
        
        const token = req.cookies.jwt;
        // console.log("Middleware token:- ", token);

        if(!token){
            return res.status(400).json({
                error: "Unauthorised User"
            });
        }
        // console.log("Middleware token:- ",process.env.JWT_TOKEN);

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if(!decoded){
            return res.status(403).json({
                error: "Invalid token"
            });
        }

        const user = await User.findById(decoded.userId);
        // console.log(user);
        

        if(!user){
            return res.status(404).json({
                error: "User not found"
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in Middleware:- ", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export default protectRoute;