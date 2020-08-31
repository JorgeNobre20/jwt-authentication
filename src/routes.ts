import { Router } from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

const Routes = Router();

Routes.get("/users",authMiddleware, UserController.index);
Routes.post("/users", UserController.store);

Routes.post("/login", AuthController.login);

export default Routes;