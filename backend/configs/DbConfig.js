const mongoose=require('mongoose');

const connectDb= async()=>{
    try{
        // eslint-disable-next-line no-unused-vars
        const connect= await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDb connected");
    }
    catch(error){
        console.log("Connection Failed with Mongo Db \n"+error);
    }
}
 module.exports= connectDb;