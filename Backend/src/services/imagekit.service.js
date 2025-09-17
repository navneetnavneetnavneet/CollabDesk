const config = require("../config/config");
const Imagekit = require("imagekit");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const imagekit = new Imagekit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

module.exports.hanldeFileUpload = async (file, oldFileId = "") => {
  if (!file) {
    throw new ErrorHandler("File is not provided !", 400);
  }

  validMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (!validMimeTypes.includes(file.mimetype)) {
    throw new ErrorHandler(
      "Invalid file type, Only image/png, image/jpeg, image/jpg, image/webp are supported !",
      400
    );
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new ErrorHandler("File size exceeds the 5MB limit.", 400);
  }

  if (oldFileId) {
    try {
      await imagekit.deleteFile(oldFileId);
    } catch (error) {
      throw new ErrorHandler("Failed to delete old file from imagekit.", 500);
    }
  }

  const modifiedFileName = uuidv4() + path.extname(file.originalname);
  const mimeType = file.mimetype.split("/")[0];

  try {
    const { fileId, url } = await imagekit.upload({
      file: file.buffer,
      fileName: modifiedFileName,
      folder: "CollabDesk",
    });

    return { fileId, url, fileType: mimeType };
  } catch (error) {
    throw new ErrorHandler("Failed to upload file on imagekit.", 500);
  }
};
