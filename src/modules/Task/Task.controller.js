import Member from "../../../Database/Models/Member.model.js"
import Task from "../../../Database/Models/Task.model.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";


export const getAllTasks = asyncHandler(async (req, res, next) => {
    const tasks = await Task.findAll({ include: { model: Member, attributes: ["name"] } });

    res.status(StatusCodes.OK).json({
        message: "Tasks found",
        tasks
    })
});

export const getTaskById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findByPk(id, { include: { model: Member, attributes: ["name"] } });

    if (!task) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Task not found");
    }

    res.status(StatusCodes.OK).json({
        message: "Task found",
        task
    })
});

export const createTask = asyncHandler(async (req, res, next) => {

    const memberId = req.body.memberId;
    const newTask = req.body;

    const memberExists = await Member.findByPk(memberId);
    if (!memberExists) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Member not found");
    }

    const task = await Task.create(newTask);

    res.status(StatusCodes.CREATED).json({
        message: "Task created successfully",
        task
    })
});

export const updateTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, status, startDate, endDate, memberId } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Task not found");
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (startDate) task.startDate = startDate;
    if (endDate) task.endDate = endDate;

    if (memberId) await Member.findByPk(memberId).then((member) => {
        if (member) task.memberId = member.memberId;
    })

    await task.save();

    res.status(StatusCodes.OK).json({
        message: "Task updated successfully",
        task
    })
})

export const deleteTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Task not found");
    }

    await task.destroy();

    res.status(StatusCodes.OK).json({
        message: "Task deleted successfully"
    })
})