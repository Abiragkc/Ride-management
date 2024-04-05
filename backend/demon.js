
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const multer = require('multer');


const app=express()
app.use(express.json())
app.use(cors({
    origin:true
}))



//creating a upload function using multer
const upload = multer({ 
    storage: multer.diskStorage({    //creating a storage space for file upload using multer disk storage
        destination:(req,file,cb)=>{
             cb(null, 'uploads/');
        } ,
        filename:(req,file,cb)=>{
            cb(null, file.fieldname+"-"+Date.now()+file.originalname);  //creating a variety name for file using date 
        }
    })
})


app.use("/uploads",express.static("uploads"))


app.post("/uploadfile",upload.single("file"),(req,res)=>{




    
    res.send("file upload success")
})








app.get("/",(req,res)=>{
    res.send("Hello this is your nodejs")
})

const userschema=new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    },
    profile_image:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    }
})
const User=mongoose.model("User",userschema)

app.post("/register",upload.single("file"),(req,res)=>{

       console.log(req.file);

     User.findOne({email:req.body.email})
     .then((use)=>{
        console.log(use);
        if(use){
            res.send("this email already present")
        }else{
            bcrypt.hash(req.body.password,12).then((hashedpassword)=>{
                console.log(hashedpassword);
                if(hashedpassword){
                    const newuser=User({
                        username:req.body.name,
                        email:req.body.email,
                        phone:req.body.phone,
                        password:hashedpassword,
                        profile_image:req.file.path
                    })
                    newuser.save().then(()=>{
                        res.send("save")
                    }).catch(()=>{
                        console.log("some problem");
                    })
                }
            })
            
        }
     })
    
   
    // res.send(req.body)
})
// Role changing
app.post('/role_update/:userid/:role',(req,res)=>{
    const userid=req.params.userid
    const role=req.params.role
    User.findByIdAndUpdate({_id:userid},{
        role:role
    }).then(()=>{
        res.send("updated success")
    }).catch(err=>{
        res.send("cannot update")
    })
    
})

app.post("/user",(req,res)=>{
 console.log(req.body);
 const newuser=User({
    username:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    password:req.body.password
 })
 newuser.save().then(()=>{
    res.send("done")
 }).catch(err=>{
    console.log("some problem");
 })
})

app.post("/login",(req,res)=>{
User.findOne({email:req.body.email})
.then((use)=>{
   console.log(use);
   if(use){

    bcrypt.compare(req.body.password,use.password,(erro,reslut)=>{
        if(erro){
            res.send(" erro on comparing password")
        }else{
            if(reslut){
                const token=jwt.sign(req.body.email,"demon")
                console.log(token);
                res.send({token:token,msg:"Login success",role:use.role})
            }else{
                res.send({token:null,msg:"password is not match"})
            }
        }
    })
   }
})

})

app.post("/start",(req,res)=>{
    const token=req.body.token

    jwt.verify(token,"demon",(err,decode)=>{
        if(err){
            res.send("jwt verification failed")
        }else{
            console.log(decode);
            User.findOne({email:decode}).then(present=>{
                console.log(present);
                res.send(present)
            })
        }
    })
})

const issuesSchema=new mongoose.Schema({
    ridesname:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    verify:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
   
})
const issues=mongoose.model("issues",issuesSchema)
app.post("/issues",(req,res)=>{
    console.log(req.body);
    const newissues=issues({
       ridesname: req.body.ridesname,
       title:req.body.title,
       description:req.body.description
    })
    newissues.save().then(()=>{
        res.send("save")
    }).catch(erro=>{
        console.log("some problem");
    })
})

app.post("/get-issues",(req,res)=>{
    issues.find().then((issues)=>{
     res.send(issues)
    }).catch(err=>{
        res.send("connot get issues")
    })
})
app.post("/issuesdelete/:id",(req,res)=>{
    const id = req.params.id

    issues.findByIdAndDelete({_id:id}).then(()=>{
        res.send("deleted success")
    }).catch((err)=>{
        res.send("cannot deleted")
    })

 })

 app.post("/verify/:id", (req, res) => {
    const id = req.params.id;

    // Find the issue by ID
    issues.findById(id)
        .then(issue => {
            // If issue is not found
            if (!issue) {
                return res.status(404).send("Issue not found");
            }

            // Toggle the verification status
            issue.verify = !issue.verify;

            // Save the updated issue
            return issue.save();
        })
        .then(() => {
            // Send response based on verification status
            res.send("changed verification");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
});



app.post("/get_user",(req,res)=>{
    User.find().then((technicians)=>{
        res.send(technicians)
    }).catch(err=>{
        res.send("cannot get technicians")
    })
})

 const rideschema= new mongoose.Schema({
    ridename:{
        type:String
    },
    disprisition:{
        type:String
    },
    rideimage:{
        type:String
    }
 })
 const Ride=mongoose.model("Ride",rideschema)

 app.post("/addrides", upload.single("file"), (req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const newride=Ride({
        ridename:req.body.ridename,
        disprisition:req.body.disprisition,
        rideimage:req.file.path
    })
    newride.save().then(()=>{
        res.send("saved")
    }).catch(err=>{
        console.log("some problem");
    })
 })
 app.post("/get-rides",(req,res)=>{
    Ride.find().then((rides)=>{
        console.log(rides);
        res.send(rides)
    }).catch(erro=>{
        res.send("cannot get rides")
    })
 })


 app.post("/delete/:id",(req,res)=>{
    const id = req.params.id

    Ride.findByIdAndDelete({_id:id}).then(()=>{
        res.send("deleted success")
    }).catch((err)=>{
        res.send("cannot deleted")
    })

 })
 app.post("/deletetech/:id",(req,res)=>{
    const id = req.params.id

    tech.findByIdAndDelete({_id:id}).then(()=>{
        res.send("deleted success")
    }).catch((err)=>{
        res.send("cannot deleted")
    })

 })






mongoose.connect("mongodb+srv://abiragkc37:gIhO0BI5o6nu1LN1@cluster0.2y4fsu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("database is connected");
}).catch((erro)=>{
    console.log("databasce not connected");
})


app.listen(3000,()=>{
    console.log(`server is running at 3000`);
})