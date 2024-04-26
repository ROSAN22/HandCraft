const express=require('express')
const path=require("path")
const bcrypt=require('bcrypt')
const app=express();
const collection=require("./config")
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login")
});
app.get("/signup",(req,res)=>{
    res.render("signup")
});

app.get('/home', (req, res) => {
    res.render("home")
});

app.get('/collections', (req, res) => {
    res.render("collections")
});
app.get('/contact', (req, res) => {
    res.render("contact")
});

app.get('/about', (req, res) => {
    res.render("about")
});

app.get('/payment', (req, res) => {
    res.render("payment")
});
app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.username,
        email:req.body.useremail,
        password:req.body.password
    }
    const existingUser=await collection.findOne({name:data.name});
    if(existingUser){
        res.send('<script>alert("User already Exists.Please choose a different username.");window.location.href = "/signup";</script>');
    }
    else{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(data.password,saltRounds);
        data.password=hashedPassword;
        const userdata=await collection.insertMany(data);
        console.log(userdata);
        res.send('<script>alert("Sign in Successful😎");window.location.href = "/";</script>');
    }
});

app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({email:req.body.useremail});
        if(!check){
            errors.email = "User email not found";
            res.status(404).json({ errors });
            return;
        }
        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            res.send("Wrong password");
        }
    }catch{
        res.send("wrong Details");
    }
});





app.listen(5000,()=>{
    console.log('Server is running on port 5000')

})