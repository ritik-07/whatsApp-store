
class node{
   constructor(desc){
      this.desc = desc;
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
   var root = new node(desc);
  desc = "Enter Store Name"
  var lvl11 = new node(desc);
  root.left = lvl11;
 desc = `Ok, you can use the menu to create, edit and share your shop  
       1. Add product
       2. manage inventory
       3. website link 
       4. Exit
        `
  var lvl21 = new node(desc);
  lvl11.right = lvl21;
   
  // add product tree 
   
  desc = "Ok what is your product name ?";
  var lvl31 = new node(desc);
  lvl21.left = lvl31;
  lvl31.menu = lvl21;
  desc = "what is your product  description ?";
  var lvl41 = new node(desc);
  lvl31.left = lvl41;
  lvl41.menu = lvl21;
  desc = "Can you add your product image ?";
  var lvl51 = new node(desc);
  lvl41.left = lvl51;
  lvl51.menu = lvl21;
  desc = "Ok what is your product's inventory ?";
  var lvl61  = new node(desc);
  lvl51.left = lvl61;
  lvl61.menu = lvl21;

  // update inventory tree

  desc = "Write your product name below";
  var lvl32 = new node(desc);
  lvl21.middle = lvl32;
  lvl32.menu = lvl21;
  desc = "What is your product's current inventory ?";
  var lvl42 = new node(desc);
  lvl32.left = lvl42;
  lvl42.menu = lvl21;

  // website link and exit tree 
  desc = "website link";
  var lvl33 = new node(desc);
  lvl21.right = lvl33;
  lvl33.menu = lvl21;
  desc = "have a nyc day :) ";
  var lvl34 = new node(desc);
  lvl21.last = lvl34;
  lvl34.menu = lvl21;

  // existing store logic 
  desc = "Enter your existing Store name ";
  var lvl12 = new node(desc);
  root.right = lvl12;
  lvl12.left = lvl21;
   
  dfs(root);