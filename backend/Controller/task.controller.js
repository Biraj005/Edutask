import assigntmentmodel from '../Model/assignment.model.js';
import userModel from '../Model/user.mode.js';
export const getAllTasks =async (req,res)=>{
    res.send("All tasks");
}

export const addTask =async (req,res)=>{

    const user = req.user;
    const {title,description,subject,deadline,attachments} = req.body;

    try {

        if(!user || !user._id){
            return res.json({success:false,message:"User must be a teacher"});
        }

        const get_teacher = await userModel.findById(user._id);

        if(!get_teacher || get_teacher.userType!=='teacher'){
             return res.json({success:false,message:"User must be a teacher"});
        }
         
        const newTask = assigntmentmodel.create({
            title,
            description,
            subject,
            deadline,
            attachments:null,
        })

       await userModel.updateMany(
        { subjects: { $in: [subject] } }, // filter
        { $push: {  } }       // update
        );

        



    } catch (error) {
        
    }


    
    res.send("Added task");
}

export const submitTask =async (req,res)=>{
    res.send("Submitted task");
}

export const getSingleTask =async (req,res)=>{
    const {userId,taskId} = req.params;
    console.log(userId)
    res.send(`Here is your task ${userId} ${taskId}`);
}