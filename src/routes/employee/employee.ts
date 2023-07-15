import express from 'express';
import employeeController from '../../controllers/employee';

const router = express.Router();

router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

export default router;
