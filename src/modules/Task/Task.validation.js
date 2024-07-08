import joi from "joi";
import { generalFields, generalSchemas } from "../../middlewares/validation.js";

export const getTaskById = generalSchemas.idFromParams;

export const deleteTask = generalSchemas.idFromParams;

export const updateTask = {
    body: joi.object().required().keys({
        name: generalFields.name,
        description: joi.string(),
        status: joi.string().valid('pending', 'in_progress', 'completed'),
        startDate: joi.date(),
        endDate: joi.date(),
        memberId: generalFields.id
    }).or("name", "description", "status", "startDate", "endDate", "memberId")
}

export const createTask = {
    body: joi.object().required().keys({
        name: generalFields.name.required(),
        description: joi.string().min(3).max(1500),
        status: joi.string().valid('pending', 'in_progress', 'completed'),
        startDate: joi.date().min(new Date()),
        endDate: joi.date().min(new Date()).when('startDate', {
            is: joi.exist(),
            then: joi.date().min(joi.ref('startDate')).required(),
            otherwise: joi.date()
        }),
        memberId: generalFields.id.required()
    })
}