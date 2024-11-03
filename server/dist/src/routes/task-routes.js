"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("../controllers/tasks-controller");
const router = (0, express_1.Router)();
router.get("/", tasks_controller_1.getTasks);
router.post("/", tasks_controller_1.createTask);
router.patch("/:taskId/status", tasks_controller_1.updateTaskStatus);
exports.default = router;
