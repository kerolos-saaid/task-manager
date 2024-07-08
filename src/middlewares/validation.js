import joi from "joi";

const dataMethods = ["body", "params", "query", "headers"];

export const generalFields = {
    id: joi.number(),
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            maxDomainSegments: 4,
            tlds: { allow: ["com", "net", "org"] },
        })
        .message("Must be a valid email"),

    name: joi.string().min(3).max(25),
};

export const generalSchemas = {
    idFromParams: {
        params: joi.object().required().keys({
            id: generalFields.id.required()
        }).required()
    }
}

export const validation = (schema) => {
    return (req, res, next) => {
        const validationErr = [];
        dataMethods.forEach((key) => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], {
                    abortEarly: false,
                });
                if (validationResult.error) {
                    validationErr.push(validationResult.error.details);
                }
            }
        });

        if (validationErr.length) {
            return res.json({ message: "Validation Error", validationErr });
        }
        return next();
    };
};