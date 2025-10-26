import assigntmentmodel from '../Model/assignment.model.js';
import submissionmodel from '../Model/submisson.model.js';
import userModel from '../Model/user.mode.js';
export const getAllTasksForTeacher =async (req,res)=>{
       const user = req.user;
       const {subject} = req.body;
       try {

        if(!user || !user._id){
            return res.json({success:false,message:"No valid credintails"});
        }
        
        if(!subject){
            return res.json({scucess:false,message:"Subject code must be provided"});
        }

        const tasks = await assigntmentmodel.find({subject});

        return res.json({success:true,tasks});

        
       } catch (error) {

          res.json({success:false,message:"Error in server"});
        
       }

}
export const addTask =async (req,res)=>{

    const user = req.user;
    const {title,description,subject,deadline,attachments} = req.body;
    console.log(title,description,subject,deadline,attachments);
    //return res.send("Test");

    try {

        if(!user || !user._id){
            return res.json({success:false,message:"User must be a teacher"});
        }

        const get_teacher = await userModel.findById(user._id);

        if(!get_teacher || get_teacher.userType!=='teacher'){
             return res.json({success:false,message:"User must be a teacher"});
        }
         
        const newTask = assigntmentmodel.create({
            createdBy:user._id,
            title,
            description,
            subject,
            deadline,
            attachments:null,
        })

       res.json({success:true,message:"Task added"});

    } catch (error) {

        res.send("Error");
        
    }
    
}

export const submitTask =async (req,res)=>{
    const {user} = req.user;
    const {assignmentId} = req.body;


    try {

        let file_link = null;
        /*  *file work  */
        if(!assignmentId){
            return res.json({success:true,message:"Assigment id should be given"});
        }
        if(!user || !user._id){
            return res.json({success:false,message:"Invalid credintals"});
        }
        const get_student = await userModel.findById(user._id);
        if(!get_student || get_student.userType==='teacher'){
            return res.json({success:false,message:"User must be a student"});
        }
        const get_assignment = await assigntmentmodel.findById(assignmentId);

        if(!get_assignment){
            return res.json({success:false,message:"No valid assignment "});
        }
        if(get_assignment.deadline <Date.now()){
            return res.json({success:false,message:"Already late for submission"});
        }
        const new_submission = submissionmodel.create({
            assignment:assignmentId,
            student:user._id,
            fileUrl:file_link,
            submittedAt:Date.now(),
            status:"submitted",
        })
        
        return res.json({sucess:true,message:"Assignment submitted"});
        
    } catch (error) {
        res.json({success:false,message:"Error in server"});
        
    }
}

export const getSingleTask =async (req,res)=>{
    const {userId,taskId} = req.params;
    console.log(userId)
    res.send(`Here is your task ${userId} ${taskId}`);
}