const { Schema, model } = require('mongoose');

const orderSchema = Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    pictureURL: {
      type: String,
      required: true,
    },
    shopId: {
        type: String,
        required: true,
    }
  });
  

  const historySchema = Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      total: {
        type: String,
        required: true,
      },
      order: {
        type: [orderSchema],
        required: true,
      },
    },
    { collection : 'history', timestamps: true, versionKey: false }
  );
  
const History = model('History', historySchema);

module.exports = { History };