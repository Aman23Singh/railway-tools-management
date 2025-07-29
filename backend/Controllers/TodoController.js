import Todo from '../Models/Todo.js';

export const getDepartments = async (req, res) => {
  try {
    const departments = await Todo.distinct('department');
    res.json(departments);
  } catch {
    res.status(500).json({ message: 'Failed to fetch departments' });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch {
    res.status(500).json({ message: 'Failed to fetch all tools' });
  }
};

export const getTodosByDepartment = async (req, res) => {
  try {
    const todos = await Todo.find({ department: req.params.department });
    res.json(todos);
  } catch {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

export const addTodo = async (req, res) => {
  const { department, tool, quantity } = req.body;
  try {
    const todo = new Todo({ department, tool, quantity });
    await todo.save();
    res.status(201).json(todo);
  } catch {
    res.status(500).json({ message: 'Failed to add todo' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete' });
  }
};

