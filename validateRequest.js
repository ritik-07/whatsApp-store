const SP =  require('./productSchema').StoreProduct;
const mongoose = require('mongoose');

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

async function validateMsg(message, temp, ID, store){
  let res = 1;

  if(temp.state == "pick" && temp.type == "store-existing"){
     res = await SP.countDocuments({senderId : ID, storeName : message}).exec()
     return res;
  }

    else if(temp.state == "pick" && temp.type == "new-store"){
     res = await SP.countDocuments({senderId : ID, storeName : message}).exec()
     if(res > 0 ) return 0;
     else return 1;
  }

   else if(temp.state == "pick" && temp.type == "newProduct"){
     res = await SP.countDocuments({senderId : ID, storeName : store, pName : message}).exec()
     if(res > 0 ) return 0;
     else return 1;
  }

  else if(temp.state === "pick" && temp.type === "productCheck"){
    console.log(store + message)
     res = await SP.countDocuments({senderId : ID, pName : message, storeName : store}).exec()
     return res;
  }
    
   else if(temp.type == "transition" ){
        if(message === "menu") return 1;
        else return 0;
   }

   else if(temp.state == "choose" ){
        let val = parseInt(message)
        if(val >= 1 && val <= 4) return 1;
        else return 0;
   }

   else if(temp.state == "pick" && temp.type === "int"){
           if(isNaN(message)) return 0;
           else return 1;
   }

  else  if(temp.state === "pick" && temp.type === "img"){
       if(isValidHttpUrl(message) || message === "no") return 1;
       else return 0;
   }
   //console.log(res,3)
   return  res;
}

module.exports = {
   validateMsg
}

