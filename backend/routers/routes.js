const express=require('express');
const {checkApi,shortenUrlRequest,getOriginalUrl,noContentAccess}=require('../controllers/controller');
const Router=express.Router();


Router.post('/api/',checkApi);
Router.post('/api/shortenUrl', shortenUrlRequest);
Router.get('/api/:shortUrl', getOriginalUrl);
Router.post('/*',noContentAccess);
Router.get('/*',noContentAccess);

module.exports=Router;