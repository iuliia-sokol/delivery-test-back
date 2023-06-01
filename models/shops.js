const { Schema, model } = require("mongoose");

const shopsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dishes: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: false
    },
    cuisine:{
      type:Array,
      required:false
    },
    logo:{
      type:String,
      required:false
    },
    _id:{
      type:String,
      required:true
    }
  },
  { collection : 'shops',  versionKey: false, timestamps: true }
);



const Shops = model("shops", shopsSchema);

module.exports = {
  Shops,
};
