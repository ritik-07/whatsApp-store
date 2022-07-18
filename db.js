const mongoose = require('mongoose');


const connectDB = async () => {
     try{
         const conn = await mongoose.connect(process.env.MONGO_URI, {
           useUnifiedTopology: true,
           useNewUrlParser: true
         })
         console.log(`MongoDB connected :${conn.connection.host}`)
     }

     catch(error){
         console.error(`error: ${error.message}`)
         process.exit(1)
     }
}



  let menu = `Ok, you can use the menu to create, edit and share your shop  
       1. Add product
       2. manage inventory
       3. website link 
       4. Exit
        `


 let events = new Map();

  events.set(0,"enter shop name");

   events.set(1,menu);

     events.set(2,"Ok what is your product name ?");
     events.set(21," what is your product  description ?");
      events.set(22,"Can you add your product image ?");
       events.set(23," Ok what is your product's inventory ?");

      events.set(3,"Write your product name below ");
       events.set(31,"What is your product's current inventory ?");
       

       events.set(4,"website link");

        events.set( 5 ,"have a nyc day :) ");





module.exports ={
    menu,
    events,
    connectDB
}
