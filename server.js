// external packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const SP =  require('./productSchema').StoreProduct;
const helpers = require('./db')

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

const { MessagingResponse } = require('twilio').twiml;

  const shop = new Map();
  const  shopName = new Map();
  const pdata = new Map();


// Home route
webApp.get('/', (req, res) => {
    res.send(` Welcome to Whats-App store :) `);
});


// fetch products route 
   webApp.get('/api/:name',  async (req, res) => {
    const data =  await SP.find({ senderId: req.params.name}).exec();

        res.status(200).json( JSON.stringify(data, null, 2));
     


   })


// Route for WhatsApp

webApp.post('/whatsapp',  (req, res) => {

   
    let senderID = req.body.From;

         

   // console.log(req.body);
   if(isNaN(shop.get(senderID)))
      shop.set(senderID, 0);
      
    console.log(shop.get(senderID));
     console.log(senderID);
 

  const { body } = req;
 let reply;


  if (body.NumMedia > 0) {
      console.log("Pppp")
      console.log(body)
        pdata[senderID].push(body.MediaUrl0);
     reply = new MessagingResponse().message(`image added !!    
      ${helpers.events.get(23)}`);
     shop.set(senderID, 24);
    //  reply.media(goodBoyUrl);
  }
   else {
      let message = req.body.Body;

         if(!isNaN(parseInt(message))  &&  shop.get(senderID) === 1   ){
             shop.set(senderID, parseInt(message)  + 1);
         }
               

        if(message ===  "Hi, I want to create shop" && shop.get(senderID) == 0){
                
                 reply = new MessagingResponse().message('enter shop name');
                  shop.set(senderID, 1);
                 
                   
          }

         else if(message === "menu" ){
               if(shop.get(senderID) != 0){
                    pdata[senderID] = [];
              reply = new MessagingResponse().message(helpers.menu);
              shop.set(senderID, 1);
               }
               else{
                    pdata[senderID] = [];
                    reply = new MessagingResponse().message("store does not exist");
             
               }

                
          }

         else  if(shop.get(senderID)=== 1){
               pdata[senderID] = [];
                  shopName[senderID] = message;
              reply = new MessagingResponse().message(helpers.menu);
         }
            
         else if(shop.get(senderID) === 2){
               pdata[senderID].push(senderID);
                 pdata[senderID].push(shopName[senderID]);
             reply = new MessagingResponse().message(helpers.events.get(2));
               shop.set(senderID, 21);
             
         }

          else if(shop.get(senderID) === 21){
                 pdata[senderID].push(message);
             reply = new MessagingResponse().message(helpers.events.get(21));
             shop.set(senderID, 22);
            
         }

          else if(shop.get(senderID) === 22){
                 pdata[senderID].push(message);
             reply = new MessagingResponse().message(helpers.events.get(22));
             shop.set(senderID, 23);
            
         }

          else if(shop.get(senderID) === 23){
                 pdata[senderID].push(message);
             reply = new MessagingResponse().message(`no image added    
            ${helpers.events.get(23)}`);
             shop.set(senderID, 24);
              
         }

          else if(shop.get(senderID) === 24){
                 let quantity = parseInt(message);
                 console.log(quantity);
                   pdata[senderID].push(message);

                   console.log(pdata[senderID]);

     const product = new SP({
        senderId : senderID,
       storeName: pdata[senderID][1],
        pName : pdata[senderID][2],
       description : pdata[senderID][3],
       image : pdata[senderID][4],
       inventory : pdata[senderID][5]
       
  });
     
  product.save((error, product) => {
    if (error){
      console.log(error)
  }
    if (product) {
        console.log(product)
      console.log("new product added !!!");
    }
  });

               reply = new MessagingResponse().message(` product added !!
                 ${"write menu anytime to go to MAIN MENU"}`);
                
             
         }

        else if(shop.get(senderID) === 3){
           
             reply = new MessagingResponse().message(helpers.events.get(3));
              shop.set(senderID, 31);
             
         }
  
           else if(shop.get(senderID) === 31){
               pdata[senderID] = message;
             reply = new MessagingResponse().message(helpers.events.get(31));
              shop.set(senderID, 32);
             
         }


             else if(shop.get(senderID) === 32){
                  
             SP.findOneAndUpdate({ pName : pdata[senderID] }, 
             { inventory : message }, null, function (err, docs) {
                        if (err){
                    console.log(err)
                      }
               else{
            console.log("Original Doc : ",docs);
            }
         });

             reply = new MessagingResponse().message(` updated !!
                 ${"write menu anytime to go to MAIN MENU"}`);
             shop.set(senderID, 1);
         }

            else if(shop.get(senderID) === 4){
                 pdata[senderID] = [];
             reply = new MessagingResponse().message(`https://whatsapp-store6565.herokuapp.com/api/${senderID}
                 write menu anytime to go to MAIN MENU`);
             shop.set(senderID, 1);
         }

            else if(shop.get(senderID) === 5){
                 pdata[senderID] = [];
             reply = new MessagingResponse().message("have a nyc day :) ");
             shop.set(senderID, 0);
         }

  }

  res.set('Content-Type', 'text/xml');

    if(typeof reply === "undefined"){
        reply = new MessagingResponse().message(" bad request ");
     res.send(reply.toString()).status(200);
    }
 
  else{
  res.send(reply.toString()).status(200);
  }

});
   
// Start the server
webApp.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});

