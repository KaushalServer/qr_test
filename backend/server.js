import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
import connection from "./connect/connection.js";
import menuRoutes from "./routes/menu.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

dotenv.config();

const port = process.env.PORT || 4500;

const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser());

// CORS issue
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
});

app.get("/", (req, res) => {
    res.send("Server Started");
});

app.listen(port, () => {
    connection();
    console.log(`Server is running on ${port}`);
});