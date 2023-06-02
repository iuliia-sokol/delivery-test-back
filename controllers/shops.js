const { nanoid } = require("nanoid");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const { ctrlWrapper, HttpError } = require("../helpers");

const { Shops } = require('../models/shops');

const avatarDir = path.join(__dirname, "../", "public", "avatars");
const productDir = path.join(__dirname, "../", "public", "products");

const avatarWidth = 250;
const avatarHeight = 250;

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

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Shops.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Product with ${id} not found`);
  }
  res.status(200).json(result);
};


const updateAvatar = async (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    throw HttpError(400, "Avatar must be provided");
  }
  const { path: tempUpload, originalname } = req.file;

  const uniqueID = nanoid();
  const filename = `${uniqueID}${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  const avatarURL = path.join("avatars", filename);

  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.resize(avatarWidth, avatarHeight).write(tempUpload);
    })
    .catch((err) => {
      throw err;
    });

  await fs.rename(tempUpload, resultUpload);
  await Shops.findByIdAndUpdate(id, { avatarURL });
  res.json({
    avatarURL,
  });
};


const updateDishPicture = async (req, res) => {
 
  const { id, name } = req.params;

  if (!req.file) {
    throw HttpError(400, "Picture must be provided");
  }
  const { path: tempUpload, originalname } = req.file;

  const uniqueID = nanoid();
  const filename = `${uniqueID}${originalname}`;
  const resultUpload = path.join(productDir, filename);

  const productURL = path.join("products", filename);

  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.resize(avatarWidth, avatarHeight).write(tempUpload);
    })
    .catch((err) => {
      throw err;
    });

  await fs.rename(tempUpload, resultUpload);
  const shop =  await Shops.findById(id)

  const product = shop.dishes.find(item=>item.id.toString() === name.toString())

  product.pictureURL = productURL

  console.log(product);

  await Shops.findByIdAndUpdate(id, { dishes: shop.dishes });
  res.json({
    productURL,
  });
};

module.exports = {
  getShops: ctrlWrapper(getShops),
  updateById: ctrlWrapper(updateById),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateDishPicture: ctrlWrapper(updateDishPicture)
};
