import { Router } from "express";
import * as TaskController from "./Task.controller.js";
import * as TaskValidationSchemas from "./Task.validation.js";
import { validation } from "../../middlewares/validation.js";

const router = Router();

router.route('/:id')
    .get(validation(TaskValidationSchemas.getTaskById),TaskController.getTaskById)
    .put(validation(TaskValidationSchemas.updateTask),TaskController.updateTask)
    .delete(validation(TaskValidationSchemas.deleteTask),TaskController.deleteTask)

router.route('/')
    .get(TaskController.getAllTasks)
    .post(validation(TaskValidationSchemas.createTask),TaskController.createTask)

export default router; 