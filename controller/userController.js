const { mongoose } = require('mongoose');
const userInstagram=require('../model/user.model');
const bcrypt=require('bcryptjs');
const cookieOptions={
    SECURE:true,
    maxAge:7*24*60*60*1000,// 7 days
    httpOnly:true
}
// sign Up start
const register=async (req,res)=>{

    const {name,username,email,password,bio}=req.body;

    if(!name || !username || !email || !password || !bio ){
        return res.status(400).json({
            success:false,
            message:"All field are required"
        })
    }

    const userExists=await userInstagram.findOne({username});
    if(userExists){
        return res.status(400).json({
            success:false,
            message:"UserName Already Exists"
        })
    }
   
    
    const userIns=await userInstagram.create({
        name,
        username,
        email,
        password:await bcrypt.hash(password,10),
        bio
    })

    if(!userIns){
  return res.status(400).json({
    success:false,
    message:"Registertion failed .."
  })
    }

    res.status(200).json({
        success:true,
        message:{userIns}
    })


}

// sign up end

// Sign In Start

 const login=async (req,res)=>{

    const {username,password}=req.body;

    const userExist= await userInstagram.findOne({username});
   
    if(!userExist){
        return res.status(404).send({
            success:false,
            message:"user associted username Not Exists"
        })
    }
    const checkPassword=await bcrypt.compare(password,userExist.password);// first plain text 

   

    if(checkPassword){
    const token=userExist.generateJwtToken();
    userExist.password=undefined;// in this when  in frontend fetch this api not get password filed 
    res.cookie('token',token,cookieOptions);
        return res.status(200).json({
            success:true,
            message:"login Successfully!",
            data:userExist
        })
    }
    else{
        return res.status(404).send({
            success:false,
            message:"password wrong"
        })
    }

 }


// sign In End

const userInfo=async (req,res)=>{
    const {id,username} = req.user;

    try{
        const userData = await userInstagram.findOne({username});
         res.status(200).send({
            msg:"Success",
            data:userData
        })

    }
    catch(err){
        res.status(501).send({msg:err.message})
    }
}

module.exports={
    login,
    userInfo,
    register
}