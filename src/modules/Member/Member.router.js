import { Router } from "express";
import * as MemberController from "./Member.controller.js";
import * as MemberValidationSchemas from "./Member.validation.js"
import { validation } from "../../middlewares/validation.js";
const router = Router();

router.route("/")
    .get(MemberController.getAllMembers)
    .post(validation(MemberValidationSchemas.createMember), MemberController.createMember)

router.route("/:id")
    .put(validation(MemberValidationSchemas.updateUser), MemberController.updateUser)
    .get(validation(MemberValidationSchemas.getMemberById), MemberController.getMemberById)
    .delete(validation(MemberValidationSchemas.getMemberById), MemberController.deleteUser)

export default router;