const express=require('express');
const crypto=require('crypto');
const bodyParser=require('body-parser');
const dotenv=require('dotenv').config();
const connectDb=require('./config/dbconfig');
const {urlEncodedDB}=require('./model/model');

<<<<<<< HEAD
const app=express();
const PORT=process.env.PORT ||3000;

//let urlBanned={};       //Implement in Database
=======



const app=express();
const PORT=process.env.PORT ||3000;

const urlList=new Map([['xter56','google.com' ],]);                           //Map Storage for Urls
let urlBanned={};
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045

shortenUrl=async (reqUrl,urlSize=5)=>{                                        //Shorten url function                    
    let shortened;
    let msg='';
    let isNotUnique = true;
    // To be changed with better algoritm for mongoDb indexing
    const hashed = crypto.createHash('sha256').update(reqUrl).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/[=uU]/g, '');
<<<<<<< HEAD
=======
    console.log(hashed);
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
    try {
    while (isNotUnique) {
        const startIndex = Math.floor(Math.random() * (hashed.length - urlSize));
        shortened = hashed.substring(startIndex, startIndex+urlSize);
<<<<<<< HEAD

        const query = urlEncodedDB.where({ shortUrl: shortened });          
        const queryResult = await query.findOne();                          //Check Url Already Exist

         if (queryResult==null) isNotUnique = false;
      
    }
=======
        const query = urlEncodedDB.where({ shortUrl: shortened });
        const queryResult = await query.findOne();
        console.log(queryResult);
         if (queryResult==null) {
            isNotUnique = false;
      }
    }
    urlList.set(shortened,reqUrl);
    console.log(urlList);
    
    console.log(shortened);
        let UrlEncodedDB= new urlEncodedDB({  shortUrl: shortened, orginalUrl: reqUrl});
        await UrlEncodedDB.save();
        console.log(saveStatus);
        msg='Url Shortened Sucess';
        console.log(msg);
    } catch (error) {
        msg=error;
    }
    
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045

   
        let UrlEncodedDB= new urlEncodedDB({  shortUrl: shortened, orginalUrl: reqUrl});
        await UrlEncodedDB.save();
        msg='Url Shortened Sucess';
    } catch (error) {
        console.log(error);
        msg=error;
    }
    return {
        shortenedUrl: shortened,
        originalUrl:reqUrl,
        statusCode:200,
        msg:msg,
    };
};

findOrginalUrl=async (shortUrl)=>{  
<<<<<<< HEAD
     try{                                         
    const query = urlEncodedDB.where({ shortUrl: shortUrl });
    const queryResult = await query.findOne();                  //fetch url from MongoDb
=======
     try{                                         //Fetch url from UrlList Map
    const query = urlEncodedDB.where({ shortUrl: shortUrl });
    const queryResult = await query.findOne();
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
    let msg='Link Not Found';
    let statusCode=200;
    if(queryResult!=null) {
        msg='Redirecting';
        statusCode=300;
    }
        return { 
            linkExist:true, 
            originalUrl:queryResult.orginalUrl, 
            requestedShortUrl:queryResult.shortUrl,
            statusCode:statusCode,
            msg:msg,
            };
        
    }
    catch(error){
<<<<<<< HEAD
        console.log(error);
=======
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
    return { 
        linkExist:false, 
        originalUrl:'',
        requestedShortUrl:shortUrl,
        statusCode:404,
        msg:error,
    };}

    
    
}

<<<<<<< HEAD
//MIDDLEWARE
=======
//MiddleWare
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


<<<<<<< HEAD
//ROUTES
//Routes too created in next commit
=======

>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
app.post('/api/',async (req,res)=>{                                 //Test api connection
    console.log('request recieved');
    res.send({response:'request recieved'});
});

app.post('/api/shortenUrl', async (req, res) => {                   //Receives Url  to shorten sends back  encoded url as per url Size
    console.log(`request recieved with url test ${req.body.originalUrl}  ${req.body.urlSize}`);
    parseUrl = req.body.originalUrl//.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '') ;       //Parse url if redirect requires no http as per production
    let shortenedUrlResponse=await shortenUrl(parseUrl,parseInt(req.body.urlSize));
    res.status(200).send(shortenedUrlResponse);
});

<<<<<<< HEAD

=======
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
app.get('/api/:shortUrl', async (req, res) => {                          //Receive shortened Url and Sends back orginalUrl if it exist  
    const  {shortUrl}  = req.params;
    console.log(`request recieved with url ${shortUrl}`);       
    retrivedUrl=await findOrginalUrl(shortUrl);
   //res.redirect(`https://${retrivedUrl}`);         //short url automatic redirecty temporary for testing
    res.status(retrivedUrl.statusCode).send(retrivedUrl);      
});

<<<<<<< HEAD
//START SERVER AND DB CONNECT
=======

//Server Start //DB cconnect
>>>>>>> db21164c5e938a0c099fb788a5a58d86b0012045
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