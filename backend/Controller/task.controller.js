
export const getAllTasks = (req,res)=>{
    res.send("All tasks");
}

export const addTask =(req,res)=>{
    
    res.send("Added task");
}

export const submitTask = (req,res)=>{
    res.send("Submitted task");
}

export const getSingleTask = (req,res)=>{
    const {userId,taskId} = req.params;
    console.log(userId)
    res.send(`Here is your task ${userId} ${taskId}`);
}