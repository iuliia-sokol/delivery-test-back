const { ctrlWrapper } = require("../helpers");

const { Shops } = require('../models/shops');

const getShops = async (req, res, next) => {
  try {
    const result = await Shops.find();
    console.log(result);

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getShops: ctrlWrapper(getShops),
};
