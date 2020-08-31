import { Router } from "express";
import UserController from "./controllers/UserController";

const Routes = Router();

Routes.get("/users", UserController.index);
Routes.post("/users", UserController.store);

Routes.post("/login", UserController.login);

export default Routes;