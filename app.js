const express =require('express');
const connectedToDb=require('./config/db.config');
const app=express();
require('dotenv').config();
const Router=require('./UserRouter/routes');
const cors=require('cors');

app.use(express.json());
app.use(cors({
   origin:'http://localhost:5500',
   credentials:true,
   
}));


app.use('/',Router);
app.use('/ping',(req,res)=>{
        res.send('Pong');
})

app.listen(8081,()=>{
    connectedToDb(process.env.MONGODBURL);
    console.log('App server run!');
})