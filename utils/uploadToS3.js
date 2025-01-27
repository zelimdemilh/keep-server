const fs = require("fs");
const AWS = require("aws-sdk");

const S3_BUCKET = "unicodebootcamp";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KET,
});

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const uploadToS3 = async (req) => {
  const fileContent = fs.readFileSync(req.file.path);

  const params = {
    ACL: "public-read",
    Body: fileContent,
    Bucket: S3_BUCKET,
    Key: req.file.originalname,
  };

  const data = await s3
    .upload(params, (err) => {
      fs.unlinkSync(req.file.path);
    })
    .promise();

  return data.Location;
};

module.exports = uploadToS3;
