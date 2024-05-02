const express = require("express");
const router = express.Router();

const { createUser, userLogin, getUser } = require("../controller/UserController");
const { createTask, getTaskList, updateTask, detailsTask, deleteTask } = require("../controller/TaskController");
const { createProject, getProjectList, detailsProject, updateProject, deleteProject } = require("../controller/ProjectController");
const { createActivity, getActivityList, detailsActivity, updateActivity, deleteActivity } = require("../controller/ActivityController");

// user
router.get("/user", getUser);
router.post("/user", createUser);
router.post("/user-login", userLogin);

// task
router.post("/task", createTask);
router.get("/task", getTaskList);
router.get("/task/:id", detailsTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

// project
router.post("/project", createProject);
router.get("/project", getProjectList);
router.get("/project/:id", detailsProject);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

// activity
router.post("/activity", createActivity);
router.get("/activity", getActivityList);
router.get("/activity/:id", detailsActivity);
router.put("/activity/:id", updateActivity);
router.delete("/activity/:id", deleteActivity);

module.exports = router;
