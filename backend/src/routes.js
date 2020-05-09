import { Router } from "express";
import ToolController from "./app/controllers/ToolController";
const routes = new Router();

routes.get("/", ToolController.store);

routes.get("/tools/:id", ToolController.show);

routes.post("/tools", ToolController.create);

routes.put("/tools/:id", ToolController.edit);

routes.delete("/tools/:id", ToolController.delete);

export default routes;
