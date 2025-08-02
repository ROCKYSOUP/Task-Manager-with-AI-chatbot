const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({


    task:{type:String,required:true},
    status:{type:String ,enum:["To-do" , "In progress", "Completed" ], default:"To-do"},
    date:{type:Date,default:Date.now},
    time:{type:String,default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}}
)

const Task=mongoose.model("Task",taskSchema)

module.exports=Task