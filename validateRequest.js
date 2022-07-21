const SP =  require('./productSchema').StoreProduct;
const mongoose = require('mongoose');
const axios = require('axios');

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

 const check = async(ID, message) => {
            try{
             const val = await SP.countDocuments({senderId : ID, pName : message }).exec()
             console.log(val,1)
             return val
            }
            catch (error) {
               console.log("error : ", error);
               }
    };

async function validateMsg(message, temp, ID){
  let res = 1;

  if(temp.state === "pick" && temp.type === "productCheck"){
     res = await SP.countDocuments({senderId : ID, pName : message }).exec()
     console.log(res,1);
  }
    
   if(temp.type == "transition" ){
        if(message === "menu") return 1;
        else return 0;
   }

   if(temp.state == "choose" ){
        let val = parseInt(message)
        if(val >= 1 && val <= 4) return 1;
        else return 0;
   }

   else if(temp.state == "pick" && temp.type === "int"){
           return Number.isInteger(parseInt(message));
   }

  else  if(temp.state === "pick" && temp.type === "img"){
       if(isValidHttpUrl(message)) console.log("img added") 
       else return 0;
   }
   console.log(res,3)
   return  res;
}

module.exports = {
   validateMsg
}

