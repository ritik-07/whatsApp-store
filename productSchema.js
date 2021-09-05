
const mongoose = require('mongoose');

const storeProductSchema = mongoose.Schema(
  {
    senderId : {
      type: String,
      required: true,
    },

    storeName: {
      type: String,
      required: true,
    },

       pName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
       inventory: {
      type: String,
      required: true,
    },

       image: {
      type: String,
      required: true,
    },

      

  },
  {
    timestamps: true,
  }
);

const StoreProduct = mongoose.model('storeProduct', storeProductSchema);

module.exports = {
     StoreProduct
};