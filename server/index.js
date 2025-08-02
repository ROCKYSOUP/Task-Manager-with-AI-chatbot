const express=require("express")
const cors=require("cors")
const env=require("dotenv")
const taskroutes=require("./routes/task")
const connectDb=require("./Data/db")



env.config()
const app=express()

app.use(cors())
app.use(express.json())
app.use("/api",taskroutes)

connectDb()

app.listen(process.env.PORT||5000, ()=>{
    try{
        console.log("Server is running ")
    }catch(err){
        console.log(err.message,"Server is having issue in running")
    }  
})