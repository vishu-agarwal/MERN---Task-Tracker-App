
const express = require("express");
const app = express();
app.use(express.json());
const port = 4000;
const mongoose = require("mongoose");

const taskModel = require("./models/task");
const userModel = require('./models/user')
mongoose
  .connect("mongodb://localhost:27017/taskTracker")
  .then(() => console.log("mongo db connected"));

app.get("/", (req, res) => res.send("Hello Fullstack!"));


//Redister User
app.post("/api/registration", (req, res) => {
  const  newUser  = req.body;
  userModel.create(newUser);
  return res.json({ data: "registered successfully, Please Login Now" });
});

//Login user
app.post('/api/login' , async (req , res)=>{

  const email = req.body.email;
  const pass = req.body.password;
  const user = await userModel.findOne({username:email,password:pass});

  if(user){
      return res.json({message: "login successfull",user:user})
  }else{
    return res.json({message: "Wrong Credentials"})
  }


});










// Get list of all users
app.get("/api/list", async (req, res) => {
  const taskList = await taskModel.find({}, { text: true });

  if (taskList.length === 0) {
    return res.json({ data: "Task is Empty" });
  }
  return res.json({ data: userList });
});

// Register user
app.post("/api/addTasks", (req, res) => {
  const  newtask  = req.body;
  taskModel.create(newtask);
  return res.json({ data: "Task Added Successfully" });
});

app.listen(port, () => console.log(`server running on port 4000`));


