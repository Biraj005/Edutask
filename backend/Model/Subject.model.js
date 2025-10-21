import mongoose, { Schema } from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    code:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    semester:{
        type:String,
        require:true,
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'user',
    }
})

const SubjectModel = mongoose.model('subjects',subjectSchema);
export default SubjectModel;