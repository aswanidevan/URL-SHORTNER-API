const {urlEncodedDB}=require('../models/model');
const crypto=require('crypto');

const shortenUrl=async (reqUrl,urlSize=5)=>{                                //Shorten url function                    
    let shortened;
    let msg='';
    let isNotUnique = true;
    // To be changed with better algoritm for mongoDb indexing

    const hashed = crypto.createHash('sha256').update(reqUrl).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/[=uU]/g, '');
    let hashedLength=hashed.length;
    try {
    while (isNotUnique&& parseInt(hashedLength)>0) {
        const startIndex = Math.floor(Math.random() * (hashed.length - urlSize));
        shortened = hashed.substring(startIndex, startIndex+urlSize);

        const query = urlEncodedDB.where({ shortUrl: shortened });          
        const queryResult = await query.findOne();                          //Check Url Already Exist

         if (queryResult==null) isNotUnique = false;
         hashedLength--;
      
    }
    if(!isNotUnique){
    const UrlEncodedDB= new urlEncodedDB({  shortUrl: shortened, orginalUrl: reqUrl});
    await UrlEncodedDB.save();
    msg='Url Shortened Sucess';
    }
    else{
        msg='Url Shortened Failed.Try Again Later Or Different Url size';
    }

    } catch (error) {
        console.log(error);
        msg="Connection With database Failed or Timed Out";

    }
    return {
        shortenedUrl: shortened,
        originalUrl:reqUrl,
        statusCode:200,
        msg:msg,
    };
}

const findOrginalUrl=async (shortUrl)=>{  
    try{                                         
    const query = urlEncodedDB.where({ shortUrl: shortUrl });
    const queryResult = await query.findOne();                              //fetch url from MongoDb
    let msg='Redirecting';
    let statusCode=200;
    if(queryResult==null) {
        msg='Link Not Found';
        statusCode=200;
        return { 
            linkExist:false, 
            originalUrl:'', 
            requestedShortUrl:shortUrl,
            statusCode:statusCode,
            msg:msg,
            };
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
        msg="Connection With database Failed or Timed Out";
        console.log(error);
    return { 
        linkExist:false, 
        originalUrl:'',
        requestedShortUrl:shortUrl,
        statusCode:200,
        msg:msg,
    };}
}


//Router Calls
const checkApi= async (req,res)=>{                                          //Test api connection
    console.log('request recieved');
    res.send({response:'request recieved'});
}

const shortenUrlRequest=async (req, res) => {                                //Receives Url  to shorten sends back  encoded url as per url Size
    console.log(`request recieved with url test ${req.body.originalUrl}  ${req.body.urlSize}`);
    //const parseUrl = req.body.originalUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '') ;      //Parse url if redirect requires no http as per production
    const shortenedUrlResponse=await shortenUrl(req.body.originalUrl,parseInt(req.body.urlSize));
    res.status(200).send(shortenedUrlResponse);
}

const getOriginalUrl=async (req, res) => {                                  //Receive shortened Url and Sends back orginalUrl if it exist  
    const  {shortUrl}  = req.params;
    console.log(`request recieved with url ${shortUrl}`);       
    const retrivedUrl=await findOrginalUrl(shortUrl);
    res.status(200).send(retrivedUrl);      
}
const noContentAccess=async (req, res) => {
    console.log('request recieved on non listed route');
    res.send({response:'API URL INVALID'});
}


module.exports={
    checkApi,
    shortenUrlRequest,
    getOriginalUrl,
    noContentAccess,

};