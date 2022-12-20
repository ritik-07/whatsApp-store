
class node{
   constructor(desc,state,type){
      this.desc = desc
      this.state = state
      this.type = type
	  this.left = null, this.right = null, this.middle = null;
	  this.last = null, this.menu = null;
   }
}


   let desc = ` ____WELCOME_____
         1. Create new Store 
         2. Check existing Store
               `
   let root = new node(desc,"choose","int");
   desc = "Enter Store Name"
   let lvl11 = new node(desc,"pick","new-store");

  root.left = lvl11;
  desc = `Now, you can use the menu to create, edit and share your shop  
       1. Add product
       2. manage inventory
       3. website link 
       4. Exit
        `
  let lvl21 = new node(desc,"choose","int");
  lvl11.left = lvl21;
   
  // add product tree 
   
  desc = "Ok what is your product name ?";
  var lvl31 = new node(desc,"pick","newProduct");
  lvl21.left = lvl31;
  lvl31.menu = lvl21;
  desc = "what is your product  description ?";
  var lvl41 = new node(desc,"pick","string");
  lvl31.left = lvl41;
  lvl41.menu = lvl21;
  desc = "Can you add your product image ? If not type 'no'";
  var lvl51 = new node(desc,"pick","img");
  lvl41.left = lvl51;
  lvl51.menu = lvl21;
  desc = "Ok what is your product's inventory ?";
  var lvl61  = new node(desc,"pick","int");
  lvl51.left = lvl61;
  lvl61.menu = lvl21;
  desc = "Added !!!";
  var lvl71  = new node(desc,"added","transition");
  lvl61.left = lvl71;
  lvl71.menu = lvl21;

  // update inventory tree

  desc = "Write your product name below";
  var lvl32 = new node(desc,"pick","productCheck");
  lvl21.middle = lvl32;
  lvl32.menu = lvl21;
  desc = "What is your product's current inventory ?";
  var lvl42 = new node(desc,"pick","int");
  lvl32.left = lvl42;
  lvl42.menu = lvl21;
   desc = "updated !!!";
  var lvl52 = new node(desc,"updated","transition");
  lvl42.left = lvl52;
  lvl52.menu = lvl21;

  // website link and exit tree 
  desc = "website link";
  var lvl33 = new node(desc,"link","transition");
  lvl21.right = lvl33;
  lvl33.menu = lvl21;
  desc = "have a nyc day ::) ";
  var lvl34 = new node(desc,"exit","exit");
  lvl21.last = lvl34;


  // existing store logic 
  desc = "Enter your existing Store name ";
  var lvl12 = new node(desc,"pick","store-existing");
  root.middle = lvl12;
  lvl12.left = lvl21;
  
  root.menu = lvl21

//   dfs(root);

module.exports = {
   ...root
}


// one lvl below export root 
