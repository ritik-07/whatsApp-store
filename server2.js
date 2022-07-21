const express = require('express');
const bodyParser = require('body-parser');
const SP =  require('./productSchema').StoreProduct;
const mongoose = require('mongoose');
const helpers = require('./db')
const root = require('./Tree');
const { validateMsg } = require('./validateRequest');
const {manageRequest} = require('./manageReq')
const { MessagingResponse } = require('twilio').twiml;
const axios = require('axios');
require('dotenv').config();


// Start the webapp
const webApp = express();

// config
helpers.connectDB(); 

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

let temp = root;
let convoStart = 0
let pData = []

async function processResponse(message, senderID){
        console.log(message)
         let nxt, reply
         if(message === "menu"){
            nxt = 5, pData = []
         } 
         let valid =  await validateMsg(message, temp,senderID)
         console.log(valid)
         if(valid){

         if(temp.state === "pick"){
             pData.push(message), nxt = 1;
         }

        else if(temp.state === "choose") nxt = parseInt(message)
        
        let prev = temp
            if(nxt === 1) temp = temp.left;
            if(nxt === 2) temp = temp.middle;
            if(nxt === 3) temp = temp.right;
            if(nxt === 4) temp = temp.last;
            if(nxt === 5) temp = temp.menu

            if(temp.state === "added"){
            const product = new SP({
            senderId : senderID, storeName: pData[0],
            pName : pData[1], description : pData[2],
            image : pData[3],inventory : pData[4]
            });
           product.save((error, product) => {
               if (error) console.log(error)
               if (product) {
                 console.log(product)
                 console.log("new product added !!!");
             }});
            pData = []
            reply = new MessagingResponse().message("product added !! write menu anytime to go to MAIN MENU");
            return reply
            }
        
        else if(temp.state === "updated"){
                console.log(pData)
                let productName = pData[1]
                SP.findOneAndUpdate({ pName : productName }, 
              { inventory : parseInt(message) }, null, function (err, docs) {
                        if (err){
                    console.log(err)
                      }
               else{
               console.log("Original Doc : ",docs);
               pData = []
               reply = new MessagingResponse().message(` updated !!
                 ${"write menu anytime to go to MAIN MENU"}`);
            }
         });
         return reply
        }
          else if(temp.state === "link"){
                 pData = [];
                 reply = new MessagingResponse().message(`https://storebot07.herokuapp.com/api/${senderID}
                 write menu anytime to go to MAIN MENU`);
                 //temp = temp.menu;
                 return reply
         }

            else if(temp.state === "exit"){
                 pData = [];
                 reply = new MessagingResponse().message("have a nyc day :) ");
                 temp = null, convoStart = 0;
                 return reply
         }
    
        if( temp === prev || temp === null ) reply = new MessagingResponse().message(" wrong input ")
        else reply = new MessagingResponse().message(temp.desc);
        return reply
         }

         else{
            reply =  new MessagingResponse().message(" WRONG INPUT ");
            return reply
         }
  }

// Home route
webApp.get('/', (req, res) => {
    res.send(` Welcome to Whats-App store :) `);
});

// fetch products route 
webApp.get('/api/:name',  async (req, res) => {
    const data =  await SP.find({ senderId: req.params.name}).exec();
        res.status(200).json(data);
})


webApp.post('/whatsapp',  async (req, res) => {

    const { body } = req;
    let message, reply, senderID = req.body.From;
    if( convoStart === 1 ){
        if(body.NumMedia > 0){ message = body.MediaUrl0;
            console.log(message)
        }
        else{ message = req.body.Body, message = message.toLowerCase() }
        if(message === "exit"){
            convoStart = 0, temp = null, pData = []
            reply = new MessagingResponse().message("Have a nyc day !!")
        }
        else reply = await processResponse(message, senderID);
    }
    else{
       message = req.body.Body;
       if(message.toLowerCase() === 'hi bot'){
         temp = root;
         convoStart = 1;
         reply = new MessagingResponse().message(temp.desc);
       }
       else{
          reply = new MessagingResponse().message("Bot not Available");
          console.log(message)
          //console.log(reply)
       }
    }
     res.set('Content-Type', 'text/xml');
     res.send(reply.toString()).status(200);
});

   // Start the server
webApp.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});

