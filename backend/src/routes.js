import { Router } from "express";
import ToolController from "./app/controllers/ToolController";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

import authMiddleware from "./app/middlewares/auth";
const routes = new Router();

routes.get("/users", UserController.store);
routes.post("/users", UserController.create);
routes.post("/sessions", authMiddleware, SessionController.store);

routes.use(authMiddleware);

routes.get("/tools", ToolController.store);
routes.get("/tools/:id", ToolController.show);
routes.post("/tools", ToolController.create);
routes.put("/tools/:id", ToolController.edit);
routes.delete("/tools/:id", ToolController.delete);

routes.put("/users", UserController.update);

export default routes;
