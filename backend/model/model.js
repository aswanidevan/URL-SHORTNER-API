const mongoose=require('mongoose');


<<<<<<< HEAD
//SCHEMAS
//basic schema for saving url 
=======
<<<<<<< HEAD
//SCHEMAS
//basic schema for saving url 
=======
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
>>>>>>> ad3631c3068c8fe144ca8fedd2ea52dad7d0c4e7
const urlEncodedSchema= mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
    },
    orginalUrl: {
        type:String,
        required:true,
    },

});

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
>>>>>>> ad3631c3068c8fe144ca8fedd2ea52dad7d0c4e7
//implement in next commit

// const urlIdCounterSchema= mongoose.Schema({
//     shortUrlLength:{
//         type:Number,
//         required:true,
//     },
//     orginalUrl: {
//         type:String,
//         required:true,
//     },

// });


<<<<<<< HEAD
//MODELS
=======
<<<<<<< HEAD
//MODELS
=======

>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
>>>>>>> ad3631c3068c8fe144ca8fedd2ea52dad7d0c4e7
const urlEncodedDB=mongoose.model("urlEncoded",urlEncodedSchema);


//implement in next commit
// const urlIdCounter=mongoose.model("urlIdCounter",urlIdCounterSchema);




module.exports={
    urlEncodedDB,
};