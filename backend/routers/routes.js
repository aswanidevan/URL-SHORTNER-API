const express=require('express');
const {checkApi,shortenUrlRequest,getOriginalUrl}=require('../controllers/controller');
const Router=express.Router();

Router.post('/api/',checkApi);
Router.post('/api/shortenUrl', shortenUrlRequest);
Router.get('/api/:shortUrl', getOriginalUrl);

module.exports=Router;