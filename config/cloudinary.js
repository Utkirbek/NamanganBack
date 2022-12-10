const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = {
  UploadImage(image) {
    cloudinary.uploader.upload(image, async (result) => {
      return result.public_id;
    });
  },

  DeleteImage(image) {
    cloudinary.uploader.destroy(image, async (result) => {
      return { message: 'Image deleted succesfully' };
    });
  },
};
