const express = require('express');
const bodyParser = require('body-parser');
const SP =  require('./productSchema').StoreProduct;
const mongoose = require('mongoose');
const helpers = require('./db')
const  root   = require('./Tree');
const { validateMsg } = require('./validateRequest');
const { MessagingResponse } = require('twilio').twiml;
const axios = require('axios');
const bcrypt = require('bcryptjs');
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

  let temp = new Map(), storeInfo = new Map()
  let  convoStart = new Map(),  pData = new Map();

async function processResponse(message, ID, index){
       // console.log(message + "-" + storeInfo[ID])
         let nxt, reply
         let valid =  await validateMsg(message, temp[ID] ,ID, storeInfo[ID])
        // console.log(valid)
         if(valid){

         if(temp[ID].type === "store-existing" || temp[ID].type === "new-store")
             storeInfo[ID] = message

         if(temp[ID].state === "pick"){
             pData[ID].push(message), nxt = 1;
         }

        else if(temp[ID].state === "choose") nxt = parseInt(message)
        
        let prev = temp[ID]
            if(nxt === 1) temp[ID] = temp[ID].left;
            if(nxt === 2) temp[ID] = temp[ID].middle;
            if(nxt === 3) temp[ID] = temp[ID].right;
            if(nxt === 4) temp[ID] = temp[ID].last;
            if(nxt === 5) temp[ID] = temp[ID].menu
           
            if(temp[ID].state === "added"){
               // console.log(pData[ID])
            const product = new SP({
            senderId : ID, storeName: storeInfo[ID],
            pName : pData[ID][1], description : pData[ID][2],
            image : pData[ID][3],inventory : pData[ID][4]
            });
            let res = 0;
            await product.save()
            res = await SP.countDocuments({ senderId : ID, storeName : storeInfo[ID], image : pData[ID][3],
                                     description : pData[ID][2],pName : pData[ID][1], inventory : pData[ID][4]}).exec()
           //  console.log(res + 'res1')
             if(res){
                pData[ID] = [], pData[ID].push(storeInfo[ID])
                reply = new MessagingResponse().message("product added !! write menu anytime to go to MAIN MENU");
               return reply
               }
             //  console.log(res+ 'res2')
                reply =  new MessagingResponse().message(" An Error occured, type menu to go to MAIN MENU ");
                return reply
            }
        
        else if(temp[ID].state === "updated"){
                //console.log(pData[ID])
                let productName = pData[ID][1]
                let res = 0;
                await SP.findOneAndUpdate({ pName : productName, ID : ID, storeName : storeInfo[ID]}, 
                                          { inventory : parseInt(message) } )
                res = await SP.countDocuments({senderId : ID, storeName : storeInfo[ID],
                                       pName : productName, inventory : parseInt(message)}).exec()
                  if(res ){
                     pData[ID] = [], pData[ID].push(storeInfo[ID])
                     reply = new MessagingResponse().message(` updated !!
                     ${"write menu anytime to go to MAIN MENU"}`);
                     return reply
                  }
                  reply =  new MessagingResponse().message(" An Error occured, type menu to go to MAIN MENU ");
                 return reply
        }

          else if(temp[ID].state === "link"){
                 pData[ID] = [], pData[ID].push(storeInfo[ID])
                 reply = new MessagingResponse().message(`https://storebot07.herokuapp.com/api/${ID}
                 write menu anytime to go to MAIN MENU`);
                 //temp = temp.menu;
                 return reply
         }

            else if(temp[ID].state === "exit"){
                  convoStart[ID] = 0, temp[ID] = null, pData[ID] = [], storeInfo[ID] = ""
                 // console.log(convoStart[ID] + "hghgh")
                 reply = new MessagingResponse().message("have a nyc day :) ");
                 return reply
         } 
    
        if( temp[ID] === prev || temp[ID] === null ) reply = new MessagingResponse().message(" wrong input ")
        else reply = new MessagingResponse().message(temp[ID].desc);
        return reply
         }

         else{
            reply =  new MessagingResponse().message(" WRONG INPUT ");
            return reply
         }
  }

// Home route
webApp.get('/', (req, res) => {
    res.send(` Welcome to Whats-App store !!!!! `);
});
    
// fetch products route 
webApp.get('/api/:name',  async (req, res) => {
    const data =  await SP.find({ senderId : req.params.name }).exec();
    res.status(200).json(data);
})


webApp.post('/whatsapp',  async (req, res) => {

    const { body } = req;
    let message, reply, ID = req.body.From;
    if(  convoStart[ID] === 1 ){
        if(body.NumMedia > 0) message = body.MediaUrl0;
        else{ message = req.body.Body, message = message.toLowerCase() }

        if(message === "exit"){
            convoStart[ID] = 0, temp[ID] = null, pData[ID] = [], storeInfo[ID] = ""
            reply = new MessagingResponse().message("Have a nyc day !!")
           // console.log(convoStart[ID] + " check")
        }

        else if(message === "menu" && storeInfo[ID] !== ""){
            pData[ID] = [], pData[ID].push(storeInfo[ID]), temp[ID] = root.menu
            reply = new MessagingResponse().message(temp[ID].desc)
         } 
        else reply = await processResponse(message, ID);
    }
    else{ 
       message = req.body.Body;
       if(message.toLowerCase() === 'hi bot'){
         temp[ID] = root, pData[ID] = [], convoStart[ID] = 1, storeInfo[ID] = ""
         reply = new MessagingResponse().message(temp[ID].desc);
       }
       else{
          convoStart[ID] = 0
          reply = new MessagingResponse().message("Bot not Available");
          //console.log(message)
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

