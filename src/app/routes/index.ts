import express from "express";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicSemesterRoutes } from "../modules/AcademicSemester/academicSemester.route";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";

const router =express.Router();
const moduleRoutes=[
    {
        path:"/students",
        router:StudentRoutes,
    },
    {
        path:"/users",
        router:UserRoutes,
    },
    {
        path:"/academic-semesters",
        router:AcademicSemesterRoutes,
    },
    {
        path:"/academic-faculties",
        router:AcademicFacultyRoutes,
    },

]
moduleRoutes.forEach((route)=> router.use(route.path,route.router));

router.use('/students',StudentRoutes);
router.use('/users',UserRoutes);

export default router;