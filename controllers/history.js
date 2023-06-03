const { History } = require('../models/history');
const { ctrlWrapper} = require("../helpers");


const setHistory = async (req, res, next) => {
  const { order, ...rest } = req.body;
  console.log({ ...rest, order: JSON.parse(order) });
  try {
    const result = await History.create({ ...rest, order: JSON.parse(order) });

    res.json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (res, next) => {
    try {
      const result = await History.find();
  
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
    setHistory: ctrlWrapper(setHistory),
    getHistory: ctrlWrapper(getHistory)
  };
  