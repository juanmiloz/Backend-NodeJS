import { Express } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";
import mangeGroupsController from "../controllers/associations.controller";
import associationsController from "../controllers/associations.controller";
import validateSchema from "../middleware/validateSchema";
import {userSchema} from "../schemas/user.schema";
import {groupSchema} from "../schemas/group.schema";
import auth from "../middleware/auth";

const routes = (app: Express) => {
  //Login
  app.post("/login", userController.login);
  
  //Users
  app.post("/users", validateSchema(userSchema),userController.create);
  app.get("/users", auth,userController.findAll);
  app.get("/users/:id", auth,userController.findById);
  app.put("/users/:id", auth,validateSchema(userSchema),userController.update);
  app.delete("/users/:id", auth,userController.delete);
  app.get("/users/:id/group", auth,userController.getGroupsInfo);
  
  //Groups
  app.post("/groups", validateSchema(groupSchema),groupController.create);
  app.get("/groups", auth,groupController.findAll);
  app.put("/groups/:id", auth,validateSchema(groupSchema),groupController.update);
  app.delete("/groups/:id", auth,groupController.delete);
  app.get("/groups/:id/users", auth,groupController.getUsersInfo);

  //manageGroup
  app.post("/associations/:groupID/:userID", auth,associationsController.addUser)
  app.delete("/associations/:groupID/:userID", auth,associationsController.removeUser)
};

export default routes;