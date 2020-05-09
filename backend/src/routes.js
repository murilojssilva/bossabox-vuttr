import { Router } from "express";
import ToolController from "./app/controllers/ToolController";
import UserController from "./app/controllers/UserController";
const routes = new Router();

routes.get("/tools", ToolController.store);
routes.get("/tools/:id", ToolController.show);
routes.post("/tools", ToolController.create);
routes.put("/tools/:id", ToolController.edit);
routes.delete("/tools/:id", ToolController.delete);

routes.get("/users", UserController.store);
routes.post("/users", UserController.create);

export default routes;
