const Joi = require("joi");
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
    avatarURL: {
      type: String,
      default: "",
    },
  },
  { collection : 'shops',  versionKey: false, timestamps: true }
);

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  price: Joi.string(),
  cuisine: Joi.array(),
  dishes: Joi.array(),
  avatarURL: Joi.string(),
});


const schemas = {
  updateSchema,
};


const Shops = model("shops", shopsSchema);

module.exports = {
  Shops,
  schemas
};
