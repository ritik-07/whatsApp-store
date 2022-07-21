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

module.exports ={
    menu,
    connectDB
}
