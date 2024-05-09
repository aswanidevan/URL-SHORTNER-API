const express=require('express');
const crypto=require('crypto');
const bodyParser=require('body-parser');
const app=express();

const PORT=process.env.PORT ||3000;

urlList=new Map([["xter56","google.com" ],]);                           //Map Storage for Urls
urlBanned={};

shortenUrl=(reqUrl,urlSize=5)=>{                                        //Shorten url function                    
    let shortened;
    let isNotUnique = true;
    console.log(reqUrl);        
    console.log(urlSize);
    const hashed = crypto.createHash('sha256').update(reqUrl).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/[=uU]/g, '');
    console.log(hashed);
    while (isNotUnique) {
        const startIndex = Math.floor(Math.random() * (hashed.length - urlSize));
        console.log(startIndex);
        shortened = hashed.substring(startIndex, startIndex+urlSize);
        console.log(startIndex+urlSize);

         if (!urlList.has(shortened)) {
            isNotUnique = false;
      }
    }
    urlList.set(shortened,reqUrl);
    console.log(urlList);

    return {
        shortenedUrl: shortened,
        originalUrl:reqUrl,
        statusCode:200,
        msg:"Url Shortened Sucess",
    };
};

findOrginalUrl=(shortUrl)=>{                                            //Fetch url from UrlList Map
    
    if(urlList.has(shortUrl))                                                                   
       return { 
        linkExist:true, 
        originalUrl:urlList.get(shortUrl), 
        requestedShortUrl:shortUrl,
        statusCode:302,
        msg:"Redirecting",
        };
        
    
    return { 
        linkExist:false, 
        originalUrl:"",
        requestedShortUrl:shortUrl,
        statusCode:404,
        msg:"Link Not Found",
    };
}


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/api/',async (req,res)=>{                                 //Test api connection
    console.log("request recieved");
    res.send({response:"request recieved"});
});

app.post('/api/shortenUrl', async (req, res) => {                   //Receives Url  to shorten sends back  encoded url as per url Size
    console.log(`request recieved with url test ${req.body.originalUrl}  ${req.body.urlSize}`);
    parseUrl = req.body.originalUrl//.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "") ;       //Parse url if redirect requires no http as per production
    let shortenedUrlResponse=shortenUrl(parseUrl,parseInt(req.body.urlSize));
    res.status(200).send(shortenedUrlResponse);
})

app.get('/api/:shortUrl',  (req, res) => {                          //Receive shortened Url and Sends back orginalUrl if it exist  
    const  {shortUrl}  = req.params;
    console.log(`request recieved with url ${shortUrl}`);       
    retrivedUrl=findOrginalUrl(shortUrl);
   //res.redirect(`https://${retrivedUrl}`);         //short url automatic redirecty temporary for testing
    res.status(retrivedUrl.statusCode).send(retrivedUrl);      
})


app.listen(PORT,()=>{
    console.log(`server running at localhost:${PORT}`);
});

