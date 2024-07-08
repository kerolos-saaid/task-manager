import joi from 'joi';
import { generalFields, generalSchemas } from '../../middlewares/validation.js';

export const createMember = {
    body: joi.object().required().keys({
        name: generalFields.name.required(),
        email: generalFields.email.required(),
    }).required()
};

export const updateUser = {
    ...generalSchemas.idFromParams,
    body: joi.object().required().keys({
        name: generalFields.name,
        email: generalFields.email,
    }).or('name', 'email').messages({
        'object.missing': 'At least one of name or email must be provided'
    })
};

export const getMemberById = generalSchemas.idFromParams;