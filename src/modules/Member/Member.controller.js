import asyncHandler from 'express-async-handler';
import Member from '../../../Database/Models/Member.model.js';
import { StatusCodes } from 'http-status-codes';

export const createMember = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body;

    const emailExists = await Member.findOne({ where: { email } });
    if (emailExists) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Email already exists');
    }

    const member = await Member.create({ name, email });

    res.status(StatusCodes.CREATED).json({
        message: 'Member created successfully',
        member
    })
})

export const getAllMembers = asyncHandler(async (req, res, next) => {
    const users = await Member.findAll()
    res.json({
        message: 'Users found',
        users
    })
})

export const getMemberById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await Member.findByPk(id);
    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }

    res.json({
        message: 'User found',
        user
    });
})

export const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const member = await Member.findByPk(id);

    if (!member) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }

    if (name) member.name = name;
    if (email) member.email = email;

    await member.save();

    res.json({
        message: 'User updated successfully',
        user: member
    });
})

export const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await Member.findByPk(id);
    if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('User not found');
    }

    await user.destroy();

    res.json({
        message: 'User deleted successfully'
    });
})