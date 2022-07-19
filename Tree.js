
class node{
   constructor(desc,state){
      this.desc = desc;
      this.state = state
	  this.left = null, this.right = null, this.middle = null;
	  this.last = null, this.menu = null;
   }
}

function dfs(root){
    if(root === null ) return;
    dfs(root.left);
    dfs(root.middle);
    dfs(root.right);
    dfs(root.last);
    console.log(root.desc)
    return;
}

   let desc = "1. Create new Store 2. Check existing Store";
   let root = new node(desc,"choose");
  desc = "Enter Store Name"
  let lvl11 = new node(desc,"pick");
  root.left = lvl11;
 desc = `Now, you can use the menu to create, edit and share your shop  
       1. Add product
       2. manage inventory
       3. website link 
       4. Exit
        `
  let lvl21 = new node(desc,"choose");
  lvl11.left = lvl21;
   
  // add product tree 
   
  desc = "Ok what is your product name ?";
  var lvl31 = new node(desc,"pick");
  lvl21.left = lvl31;
  lvl31.menu = lvl21;
  desc = "what is your product  description ?";
  var lvl41 = new node(desc,"pick");
  lvl31.left = lvl41;
  lvl41.menu = lvl21;
  desc = "Can you add your product image ?";
  var lvl51 = new node(desc,"pick");
  lvl41.left = lvl51;
  lvl51.menu = lvl21;
  desc = "Ok what is your product's inventory ?";
  var lvl61  = new node(desc,"pick");
  lvl51.left = lvl61;
  lvl61.menu = lvl21;
  desc = "Added !!!";
  var lvl71  = new node(desc,"added");
  lvl61.left = lvl71;
  lvl71.menu = lvl21;

  // update inventory tree

  desc = "Write your product name below";
  var lvl32 = new node(desc,"pick");
  lvl21.middle = lvl32;
  lvl32.menu = lvl21;
  desc = "What is your product's current inventory ?";
  var lvl42 = new node(desc,"pick");
  lvl32.left = lvl42;
  lvl42.menu = lvl21;
   desc = "updated !!!";
  var lvl52 = new node(desc,"updated");
  lvl42.left = lvl52;
  lvl52.menu = lvl21;

  // website link and exit tree 
  desc = "website link";
  var lvl33 = new node(desc,"pick");
  lvl21.right = lvl33;
  lvl33.menu = lvl21;
  desc = "have a nyc day :) ";
  var lvl34 = new node(desc,"pick");
  lvl21.last = lvl34;
  lvl34.menu = lvl21;

  // existing store logic 
  desc = "Enter your existing Store name ";
  var lvl12 = new node(desc,"pick");
  root.right = lvl12;
  lvl12.left = lvl21;
   
//   dfs(root);

module.exports ={
   ...root
}

// one lvl below export root 
