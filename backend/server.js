const express = require("express")
const cors =  require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const cloudinary = require("cloudinary").v2
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const bcrypt = require("bcrypt");   
const jwt = require("jsonwebtoken");


const app = express()

app.use(cors())
app.use(express.json())





mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connection Established"))
.catch((err)=>console.log("Failed to connect",err));







const homeSchema = require("./models/home")
const contactSchema = require("./models/contact")
const { education, experience, Education, Experience } = require("./models/about");
const skillSchema = require("./models/skillls")
const softSchema = require("./models/softSkill")
const workSchema = require("./models/workEthics")
const projectSchema = require("./models/projects")
const linkSchema = require("./models/link")
const passwordSchema = require("./models/password")










app.get("/",(req,res)=>{
    res.send("Backend is running")
})




















//////////////// Image Storage Configuration  //////////////////////////////

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


// configure multer-storage-cloudinary
const imageUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "profile",
      allowed_formats: ["jpg", "jpeg", "png"],
    },
  }),
});

const fileUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "profile",
      resource_type: "raw", // ⭐ for pdf, docx
    },
  }),
});

///////////////////////////////////////////////////////////////////////////////




















/////////////////////////  Home  /////////////////////////////////

app.post("/home",imageUpload.single("image"),async (req,res)=>{
    
    try{
        let {greeting,naam,profession,description,experience,projects,clients,} = req.body
        
        let image
        const updatedData = {
            greeting,naam,profession,description,image,experience,projects,clients
        }

        if(req.file) {
            updatedData.image = req.file.path
        }

        const newData = await homeSchema.findOneAndUpdate(
            {},
            updatedData,
            {new:true,upsert:true}
        )

        res.status(200).json({message:"Data Saved Successfully"})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})







app.get("/home",async (req,res)=>{
    try{
        const allData = await homeSchema.findOne()
        res.status(200).json({data:allData})

    }
    catch(err){
        res.status(200).json({message:err})
    }
})




app.post("/pdf", fileUpload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }
    console.log(req.file.mimetype)
    await homeSchema.findOneAndUpdate(
      {},
      { $set: { pdf: req.file.path } },
      { returnDocument: "after", upsert: true }
    );

    res.status(200).json({ message: "PDF updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/////////////////////////////////////////////////////////////////






























///////////////////////  About Me  //////////////////////////////////////

app.post("/education",async (req,res)=>{
    try{
        let {duration,title,description} = req.body
        await Education.create({duration,title,description})
    }catch(err){
        return res.status(500).json({message:err})
    }
})







app.post("/experience",async (req,res)=>{
    try{
        let {duration,title,description} = req.body
        await Experience.create({duration,title,description})
    }catch(err){
        return res.status(500).json({message:err})
    }
})










app.get("/education",async (req,res)=>{
    try{
        const allData = await Education.find()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})







app.get("/experience",async (req,res)=>{
    try{
        const allData = await Experience.find()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})

////////////////////////////////////////////////////////////////////////































/////////////////////////////////  Contact  ///////////////////////////////////////////////

app.post("/link",async(req,res)=>{
    try{
        let {facebook,instagram,phone,whatsapp,viber,email,linkedin,github} = req.body
        await linkSchema.findOneAndUpdate(
            {},
            {facebook,instagram,phone,whatsapp,viber,email,linkedin,github},
            {new:true,upsert:true}
        )
        
        return res.status(200).json({message:"Success"})
    }catch(err){
        return res.status(500).json({message:err})
    }
})







app.get("/link",async (req,res)=>{
    try{
        const allData = await linkSchema.findOne()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})







app.post("/contact",async(req,res)=>{
    try{
        let {clientName,clientEmail,clientMessage} = req.body
        await contactSchema.create({clientName,clientEmail,clientMessage})
        
        return res.status(200).json({message:"Success"})
    }catch(err){
        return res.status(500).json({message:err})
    }
})





app.get("/contact",async (req,res)=>{
    try{
        const allData = await contactSchema.find()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})

////////////////////////////////////////////////////////////////////////////////////////////






























///////////////////////////  Projects  ///////////////////////////////////////////////

app.post("/projects",imageUpload.single("image"),async(req,res)=>{
    try{
        let {projectTitle,projectDesp,projectLink,githubLink} = req.body

        let image
        if(req.file) {
            image = req.file.path
        }
        await projectSchema.create({projectTitle,projectDesp,projectLink,githubLink,image})
        return res.status(200).json({message:"Success"})
    }catch(err){
        return res.status(500).json({message:err})
    }
})







app.get("/projects",async (req,res)=>{
    try{
        const allData = await projectSchema.find()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})

//////////////////////////////////////////////////////////////////////////////////////































////////////////////////////////  Skills   /////////////////////////////////////////////

app.post("/skills",async(req,res)=>{
    try{
        let {skillTitle,skillDesp,projectsLink,githubLink} = req.body
        await skillSchema.create({skillTitle,skillDesp,projectsLink,githubLink})
        
        return res.status(200).json({message:"Success"})
    }catch(err){
        return res.status(500).json({message:err})
    }
})







app.post("/soft",async(req,res)=>{
    try{
        let {skillTitle,skillValue} = req.body
        await softSchema.create({skillTitle,skillValue})
        
        return res.status(200).json({message:"Success"})
    }catch(err){
        return res.status(500).json({message:err})
    }
})







app.post("/work",async(req,res)=>{
    try{
        let {ethicsTitle,ethicsValue} = req.body
        await workSchema.create({ethicsTitle,ethicsValue})
        
        return res.status(200).json({message:"Success"})
    }catch(err){
        return res.status(500).json({message:err})
    }
})















app.get("/skills",async (req,res)=>{
    try{
        const allData = await skillSchema.find()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})







app.get("/soft",async (req,res)=>{
    try{
        const allData = await softSchema.find()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})










app.get("/work",async (req,res)=>{
    try{
        const allData = await workSchema.find()
        res.status(200).json({data:allData})
    }
    catch(err){
        res.status(500).json({message:err})
    }
})

///////////////////////////////////////////////////////////////////////////////////////




























///////////////////////////////  Settings  ////////////////////////////////

app.post("/settings",async (req,res)=>{
    try{
        let {oldPassword,newPassword} = req.body

        const doc = await passwordSchema.findOne({})

        const password = doc.password

        const isMatch = await bcrypt.compare(oldPassword, password);
        console.log(isMatch)

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        else{
            const hashedPassword = await bcrypt.hash(newPassword,10)
            await passwordSchema.findOneAndUpdate(
                {},
                {password:hashedPassword},
                {upsert:true}
            )
        
            return res.status(200).json({message:"Password changed successfully"})
        }
        
    }catch(err){
        return res.status(500).json({message:err})
    }
})

///////////////////////////////////////////////////////////////////////////





























////////////////////////////   Conform Password  ////////////////////////////////////

app.post("/password",async (req,res)=>{
    try{
        let {password} = req.body

        const doc = await passwordSchema.findOne({})

        const myPassword = doc.password

        const isMatch = await bcrypt.compare(password, myPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        else{
            const token = jwt.sign(
                {
                    id:doc.id,
                },
                process.env.JWT_SECRET
            )
            return res.status(200).json({ message: "Correct password",token});
        }
       
        
    }catch(err){
        return res.status(500).json({message:err})
    }
})

////////////////////////////////////////////////////////////////////////////////////





























/////////////////////////  Verify token   //////////////////////////////////////////

app.get("/verify-token",(req,res)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({message:"No token"})
        }

        jwt.verify(token,process.env.JWT_SECRET)

        return res.status(200).json({message:"Success"})

    }catch(err){
        console.log(err)
    }
})
    
////////////////////////////////////////////////////////////////////////////////////










app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend Running")
})