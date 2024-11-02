import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
import connection from "./connect/connection.js";
import menuRoutes from "./routes/menu.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const port = process.env.PORT || 4500;

app.use(express.json());
app.use(cookieParser());

// CORS issue
const corsOptions = {
    origin: ['http://localhost:5173', 'https://qr-menu-frontend-five.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // trying this because of method not allowed error
    credentials: true,
}

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

app.get("/", (req, res) => {
    res.send("server started");
});

app.listen(port, () => {
    connection();
    console.log(`Server is running on ${port}`);
});