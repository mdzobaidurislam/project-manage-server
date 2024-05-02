const express = require("express");
const router = express.Router();

const { createUser, userLogin } = require("../controller/UserController");
const { createTask, getTaskList } = require("../controller/TaskController");

// user
router.post("/user", createUser);
router.post("/user-login", userLogin);

// task
router.post("/task", createTask);
router.get("/task", getTaskList);

module.exports = router;
