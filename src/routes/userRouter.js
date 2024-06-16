import express from "express";
import User  from "../controllers/userController.js";
const userRoute = express.Router();
import verificarJwt from '../middlewares/jwt.js'



userRoute.post("/",User.create);
userRoute.get("/:id",verificarJwt,User.getUserById);


export default userRoute;