const { hashPassword, comparePassword } = require("../helpers/authhelper")
const userModel  = require("../models/userModel")
const JWT = require('jsonwebtoken')


const registerController=async(req,resp)=>{
try {
    const{username , email , password} = req.body
    //validation
    if(!username){
        return resp.send({error:'username is rquired'})
    }
    if(!email){
        return resp.send({error:'email is rquired'})
    } 
    if(!password){
        return resp.send({error:'password is rquired'})
    }

    const existingUser =await userModel.findOne({email})
    //existing user
    if(existingUser){
        return resp.status(200).send({
            success:true,
            message:"already registered please login"
        })
    }
    //register User
    const hashedPassword = await hashPassword(password)
    const user = new userModel({username, email , password:hashedPassword})
     await  user.save()
    resp.status(201).send({
        success:true, 
        message:'user registered successfully',
        user
    })

} catch (error) {
    console.log(error)
    resp.status(500).send({
        success:false,
        message:'registration failed',
        error
    })
}
}


const loginController= async (req,resp)=>{
try {
    const{email,password}=req.body
    if(!email || !password){
        return resp.status(404).send({
            success:false,
            message:"invalid credentials"
        })
    }
 //check user
    const user = await userModel.findOne({email})
    if(!user){
        return resp.status(404).send({
            success:false,
            message:'email is not registered'

        })
    }
//compare password
    const match = await comparePassword(password , user.password)
    if(!match){
        return resp.status(200).send({
            success:false,
            message:'Invalid password'
        })
    }
    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET , {expiresIn:'7d'})
    resp.status(200).send({
        success:true, 
        message:'login successfully',
        user:{
            name:user.username,
            email:user.email
        },
        token,
    })
} 
catch (error) {
    console.log(error)
    resp.status(500).send({
        success:false,
        message:'error in login',
        error
    })
}
}

const testController=(req,resp)=>{
    resp.send('protected routes')
}

module.exports={registerController,loginController,testController}