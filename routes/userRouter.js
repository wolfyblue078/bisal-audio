import e from "express";
import { RegisterUser } from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post("/new", RegisterUser);


export default userRouter;