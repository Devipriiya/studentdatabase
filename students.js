import express from "express";

import mongoose from "mongoose";
import connectDB from "./studentsdb.js";
const router =express.Router();
connectDB();
// Students
const studentsSchema=mongoose.Schema(
    {
    name:{
        type:String,
       
        },
    rollno:{
         type:String,
      
     },
                     })

var Students = mongoose.model('Students', studentsSchema);
studentsSchema.plugin(Students);
const students=[
   {
     name:"devipriya",
    rollno:"1"
},
{
    name:"rathiga",
    rollno:"2"
},
{
    name:"aswini",
    rollno:"3"
},
{
    name:"hari",
    rollno:"4"
},
{
    name:"megha",
    rollno:"5"
},
{
    name:"hemprashanth",
    rollno:"6"
},
{
    name:"joys",
    rollno:"7"
},
{
    name:"naveen",
    rollno:"8"
},
]
// connectDB();
const app=express();
app.use(express.json());




router.get('/',(req,res) =>
{
    try{
        res.status(200).send(students);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
   Students.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            students:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})

router.post('/',async(req,res)=>{
    try{
        const students={
           name:req.body.name,
            rollno:req.body.rollno,
           
        }
        console.log(students);
        var create=new Students(students);
        var studentsCreated=await create.save();
      
        if(studentsCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Students.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            name:req.body.name,
            rollno:req.body.rollno,

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_students:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    router.delete('/:id',(req,res)=>{
        console.log(req.params.id);
        Students.deleteOne({_id:req.params.id},{
            $set:{
               
                name:req.body.name,
                rollno:req.body.rollno,
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_students:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        router.delete('/',(req,res)=>{
    
            Students.deleteMany({students},(err,result)=>{
            if(err) throw err
            res.send(students)
            })
        })

        export default router;
        const port=4000;
        app.listen(port,()=>{
            console.log(`server is running at ${port}`);
            console.log(students);
        });