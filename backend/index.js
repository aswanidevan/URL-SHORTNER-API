const express=require('express');
const dotenv=require('dotenv').config();
const connectDb=require('./configs/DbConfig');
const routers=require('./routers/routes');
var cors = require('cors');


const app=express();
const PORT=process.env.PORT ||3000;
const allowedOrigins = [ process.env.APP_URL, process.env.APP_URL-1, process.env.APP_URL-2];
//MIDDLEWARE

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

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