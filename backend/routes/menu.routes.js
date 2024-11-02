import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addItem, deleteItem, getMenu, updateItem } from "../controllers/menu.controller.js";

const router = express.Router();

router.get('/get-menu', protectRoute, getMenu);
router.post('/get-menu', getMenu);
router.post('/add-item', protectRoute, addItem);
router.post('/update-item/:id', protectRoute, updateItem);
router.delete('/remove-item/:id', protectRoute, deleteItem);

export default router;