const mongoose=require('mongoose');

<<<<<<< HEAD
//
=======
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
const connectDb= async()=>{
    try{
        const connect= await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDb connected");
    }
    catch(error){
        console.log(error);
    }
}
 module.exports= connectDb;