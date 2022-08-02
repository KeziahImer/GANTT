import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const projectSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    tasks: [{ type: String, required: false }]
});

projectSchema.plugin(uniqueValidator);

export default mongoose.model('Project', projectSchema);
