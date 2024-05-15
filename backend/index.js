const express=require('express');
const dotenv=require('dotenv').config();
const connectDb=require('./configs/dbconfig');
const routers=require('./routers/routes');
var cors = require('cors');


const app=express();
const PORT=process.env.PORT ||3000;

//MIDDLEWARE
app.use(cors());
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
        console.log("Server Failed to start")
        console.log(error);
    }
})();
// startServer();