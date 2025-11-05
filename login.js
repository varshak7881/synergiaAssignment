

const express = require ('express')
require('dotenv').config()
const EventEmitter= require ('events')
const nodemailer= require('nodemailer')
const event=new EventEmitter()
const app= express()
app.use(express.json())
const password =process.env.password


async function sendEmail(title,content){
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"varshak7881@gmail.com",
            pass:password
        }
    })
    const mailOptions={
        from:'"Skill Lab" <varshak7881@gmail.com>',
        to:'varshak935308@gmail.com',
        subject: title,
        text: content,

    }
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
}


event.on('login-success',()=>{
    console.log("Someone logged in from Sahyadri Backend Workshop")
    sendEmail('Login Successful',"Someone logged in from Sahyadri Backend Workshop")
})


event.on('login-failed',()=>{
    console.log("Someone tried logging in from Sahyadri Backend Workshop. Reset password!!")
    sendEmail('Login Successful',"Someone logged in from Sahyadri Backend Workshop")
})

app.post('/login',(request,response)=>{
    const {email,password}=request.body;
    if(email=='varshak99@gmail.com' && password=="pass@123"){
        //we will trigger the success action
        event.emit('login-success')
    }
    else{
        //we will trigger the fail action
        event.emit('login-failed')
    }
    response.send(200)
})

app.listen(3005,()=>{
    console.log('Server started')
})