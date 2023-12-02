import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { studentControllers } from './student.controller';
import { studentValidations } from './student.validation';

const router = express.Router();

// will call controller function


router.get('/', studentControllers.getAllStudents);

router.get('/:studentId', studentControllers.getSingleStudent);
router.patch(
    '/:studentId',
    validateRequest(studentValidations.updateStudentValidationSchema),
    studentControllers.updateStudent,
   
  );
router.delete('/:studentId', studentControllers.deleteStudent);

export const StudentRoutes = router;
