const mongoose=require('mongoose');


//SCHEMAS
//basic schema for saving url 

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

const urlEncodedDB=mongoose.model("urlEncoded",urlEncodedSchema);


//implement in next commit
// const urlIdCounter=mongoose.model("urlIdCounter",urlIdCounterSchema);




module.exports={
    urlEncodedDB,
};