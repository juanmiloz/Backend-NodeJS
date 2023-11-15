import { Express } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";
import mangeGroupsController from "../controllers/associations.controller";
import associationsController from "../controllers/associations.controller";

const routes = (app: Express) => {
  //Login
  app.post("/login", userController.login);
  
  //Users
  app.post("/users", userController.create);
  app.get("/users", userController.findAll);
  app.get("/users/:id", userController.findById);
  app.put("/users/:id", userController.update);
  app.delete("/users/:id", userController.delete);
  app.get("/users/:id/group", userController.getGroupsInfo);
  
  //Groups
  app.post("/groups", groupController.create);
  app.get("/groups", groupController.findAll);
  app.put("/groups/:id", groupController.update);
  app.delete("/groups/:id", groupController.delete);
  app.get("/groups/:id/users", groupController.getUsersInfo);

  //manageGroup
  app.post("/associations/:groupID/:userID", associationsController.addUser)
  app.delete("/associations/:groupID/:userID", associationsController.removeUser)
};

export default routes;