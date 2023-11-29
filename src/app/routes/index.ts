import express from "express";
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

]
moduleRoutes.forEach((route)=> router.use(route.path,route.router));

router.use('/students',StudentRoutes);
router.use('/users',UserRoutes);

export default router;