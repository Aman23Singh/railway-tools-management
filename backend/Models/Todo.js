import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  department: { type: String, required: true },
  tool: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model('Todo', TodoSchema);
