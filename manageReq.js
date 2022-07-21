const SP =  require('./productSchema').StoreProduct;
const { MessagingResponse } = require('twilio').twiml;
const mongoose = require('mongoose');

function manageRequest(message, senderID,pData){
    
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
                 pData = [], temp = null, convoStart = 0;
                 reply = new MessagingResponse().message("have a nyc day :) ");
                 return reply
         }
    
        if( temp === prev || temp === null ) reply = new MessagingResponse().message(" wrong input ")
        else reply = new MessagingResponse().message(temp.desc);
        return reply
}

module.exports = {manageRequest}
