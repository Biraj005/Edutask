import SubjectModel from "../Model/Subject.model.js";

export const getAllsubjects =async (req,res)=>{
    const {creator,semester} = req.body;
    console.log(creator,semester)
    console.log(req.user);
    // if(!creator && !semester){
    //     return res.json({success:false,message:"fields require"})
    // } 
    try {
        let _subject;
        if(!creator){
            _subject = await SubjectModel.find({semester});
        }else{
            _subject = await SubjectModel.find({creator});
        }
        res.json({success:true,_subject})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in server"});
    }
}

export const getSingleSubject = (req,res)=>{
    res.send("single subject");
}

export const addSubject =async (req,res)=>{
    console.log("Hiiii")
    const {name,code,description,semester,creator} = req.body;
    console.log(name,code,description)

    try {
        if(!name || !code || !description || !semester || !creator){
            return res.json({success:false,message:"All fields required"});
        }
        const find_subject = await SubjectModel.findOne({
            $or: [
                { name: name },   
                { code: code }    
            ]
            });

        if(find_subject){
            return res.json({success:false,message:"Subject already exists"});
        }    
        const newSubject = await SubjectModel.create({
            name,
            code,
            description,
            semester,
            creator
        })
        console.log('new Subject',newSubject);
        res.json({success:true,message:"Subject added",newSubject});

    } catch (error) {
        console.error(error);
        res.json({success:false,message:"Error in server"});
    }


}