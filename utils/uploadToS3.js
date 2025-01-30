const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const IMAGEBAN_API_URL = "https://api.imageban.ru/v1";
const SECRET_KEY = process.env.IMAGEBAN_SECRET_KEY;

const uploadToS3 = async (req) => {
  try {
    const filePath = req.file.path;
    const fileStream = fs.createReadStream(filePath);

    const formData = new FormData();
    formData.append("image", fileStream);

    const response = await axios.post(IMAGEBAN_API_URL, formData, {
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        ...formData.getHeaders(),
      },
    });

    fs.unlinkSync(filePath); 

    if (response.data.success) {
      console.log(JSON.stringify(response.data, null, 2))
      return response.data.data.link;
    } else {
      throw new Error("Ошибка загрузки на ImageBan");
    }
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    throw error;
  }
};


module.exports = uploadToS3;
