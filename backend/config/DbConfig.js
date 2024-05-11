const mongoose=require('mongoose');

<<<<<<< HEAD
//
=======
<<<<<<< HEAD
//
=======
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
>>>>>>> ad3631c3068c8fe144ca8fedd2ea52dad7d0c4e7
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