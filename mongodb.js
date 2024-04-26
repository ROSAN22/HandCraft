const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/handmade")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("mongodb not connected")
})

const LogInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("Collection1",LogInSchema)
module.exports=collection
