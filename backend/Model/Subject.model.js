import mongoose, { Schema } from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    semester: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'user' },
    students: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    tasks: [{
        title: String,
        description: String,
        dueDate: Date,
        status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
        createdAt: { type: Date, default: Date.now },
    }],
    credits: { type: Number, default: 3 },
    department: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });


const SubjectModel = mongoose.model('subjects',subjectSchema);
export default SubjectModel;