const express=require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv').config();
const connectDb=require('./configs/dbconfig');
const {urlEncodedDB}=require('./models/model');
const routers=require('./routers/routes');


const app=express();
const PORT=process.env.PORT ||3000;


//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routers); //ROUTES

//START SERVER AND DB CONNECT
(async function(){
    try{
    await connectDb();
    app.listen(PORT,()=>{
        console.log(`server running at localhost:${PORT}`);
    });}
    catch(error){
        console.log(error);
    }
    
})();
// startServer();