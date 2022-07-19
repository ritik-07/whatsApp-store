#include<bits/stdc++.h>
using namespace std;

class node{
   public:
   string desc;
   node *left, *right, *middle, *menu, *last;
   node(string d){
      desc = d;
      left = NULL, right = NULL, middle = NULL, last = NULL;
   }
};

void dfs(node *root){
    if(root == NULL) return;
    dfs(root->left);
    dfs(root->middle);
    dfs(root->right);
    dfs(root->last);
    cout << root->desc<<"\n";
    return;
}

int main(){
   string  desc = "1. Create new Store 2. Check existing Store";
   node *root = new node(desc);
   desc = "Enter Store Name";
   node* lvl_one_one = new node(desc);
   root->left = lvl_one_one;
   desc  = "Ok, you can use the menu to create, edit and share your shop 1. Add product2. manage inventory3. website link 4. Exit";
   node *lvl_two_one = new node(desc);
   lvl_one_one->right = lvl_two_one;
   
   // add product tree 
   
   desc = "Ok what is your product name ?";
   node *lvl_three_one = new node(desc);
   lvl_two_one->left = lvl_three_one;
   lvl_three_one->menu = lvl_two_one;
   desc = "what is your product  description ?";
   node *lvl_four_one = new node(desc);
   lvl_three_one->left = lvl_four_one;
   lvl_four_one->menu = lvl_two_one;
   desc = "Can you add your product image ?";
   node *lvl_five_one = new node(desc);
   lvl_four_one->left = lvl_five_one;
   lvl_five_one->menu = lvl_two_one;
   desc = " Ok what is your product's inventory ?";
   node *lvl_six_one = new node(desc);
   lvl_five_one->left = lvl_six_one;
   lvl_six_one->menu = lvl_two_one;

  // update inventory tree

   desc = "Write your product name below";
   node *lvl_three_two = new node(desc);
   lvl_two_one->middle = lvl_three_two;
   lvl_three_two->menu = lvl_two_one;
   desc = "What is your product's current inventory ?";
   node *lvl_four_two = new node(desc);
   lvl_three_two->left = lvl_four_two;
   lvl_four_two->menu = lvl_two_one;

   // website link and exit tree 
   desc = "website link";
   node *lvl_three_three = new node(desc);
   lvl_two_one->right = lvl_three_three;
   lvl_three_three->menu = lvl_two_one;
   desc = "have a nyc day :) ";
   node *lvl_three_four = new node(desc);
   lvl_two_one->last = lvl_three_four;
   lvl_three_four->menu = lvl_two_one;

   // existing store logic 
   desc = "Enter your existing Store name ";
   node *lvl_one_two = new node(desc);
   root->right = lvl_one_two;
   lvl_one_two->left = lvl_two_one;

   dfs(root);
    return 0;
}
