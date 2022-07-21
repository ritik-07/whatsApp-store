const SP =  require('./productSchema').StoreProduct;

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function validateMsg(message, temp, ID){

   if(temp.type == "transition" ){
        if(message === "menu") return 1;
        else return 0;
   }

   if(temp.state == "choose" ){
        let val = parseInt(message)
        if(val >= 1 && val <= 4) return 1;
        else return 0;
   }
   if(temp.state === "pick" && temp.type === "productCheck"){
       let res =  SP.find({ senderId:  ID, pName: message })
      console.log(res)
      return 1
   }
   if(temp.state == "pick" && temp.type === "int"){
           return Number.isInteger(parseInt(message));
   }

   if(temp.state === "pick" && temp.type === "img"){
       if(isValidHttpUrl(message)) return 1;
       else return 0;
   }
   return 1;
}

module.exports = {
   validateMsg
}

