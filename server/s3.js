require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.S3_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Uploads a file to s3
const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  const result = await s3.upload(uploadParams).promise();
  return result;
};
exports.uploadFile = uploadFile;

// Downloads a file from s3
const getFileStream = (fileName) => {
  const downloadParams = {
    Key: fileName,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};

exports.getFileStream = getFileStream;
