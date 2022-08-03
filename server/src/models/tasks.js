import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const taskSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
});

taskSchema.plugin(uniqueValidator);

export default mongoose.model('Task', taskSchema);
