import express from 'express';
import {
  getDepartments,
  getAllTodos,
  getTodosByDepartment,
  addTodo,
  deleteTodo,
} from '../Controllers/TodoController.js';

const router = express.Router();

router.get('/departments', getDepartments);
router.get('/todo', getAllTodos);
router.get('/todo/:department', getTodosByDepartment);
router.post('/todo', addTodo);
router.delete('/todo/:id', deleteTodo);

export default router;
