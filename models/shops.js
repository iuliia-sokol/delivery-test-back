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
  },
  { versionKey: false, timestamps: true }
);



const Shops = model("shops", shopsSchema);

module.exports = {
  Shops,
};
