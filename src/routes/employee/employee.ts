import express from "express";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../controllers/employee";

const router = express.Router();

router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
