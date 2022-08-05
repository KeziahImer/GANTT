import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  tasks: [{ type: ObjectId, ref: 'Task', required: false }],
  userId: { type: ObjectId, ref: 'Users', required: true }
});

export default mongoose.model('Project', projectSchema);
