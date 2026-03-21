import e from "express";
import { getUser, RegisterUser } from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post("/new", RegisterUser);
userRouter.get("/users", getUser);


export default userRouter;