import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { academicSemesterValidations } from "./academicSemester.validation";
const router= express.Router();

router.post('/create-academic-semesters',
validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema)
,AcademicSemesterControllers.createAcademicSemester);

router.get("/",AcademicSemesterControllers.getAllAcademicSemesters);
router.get("/:semesterId",AcademicSemesterControllers.getSingleAcademicSemester);

router.patch("/:semesterId",
validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,


)


export const AcademicSemesterRoutes= router