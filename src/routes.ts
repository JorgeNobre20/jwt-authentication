import { Router } from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

const Routes = Router();

Routes.get("/users", UserController.index);
Routes.post("/users", UserController.store);

Routes.post("/login", authMiddleware ,AuthController.login);

export default Routes;