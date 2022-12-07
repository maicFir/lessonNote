"use strict";
var common_vendor = require("../../../../common/vendor.js");
const get_file_ext = (name) => {
  const last_len = name.lastIndexOf(".");
  const len = name.length;
  return {
    name: name.substring(0, last_len),
    ext: name.substring(last_len + 1, len)
  };
};
const get_extname = (fileExtname) => {
  if (!Array.isArray(fileExtname)) {
    let extname = fileExtname.replace(/(\[|\])/g, "");
    return extname.split(",");
  } else {
    return fileExtname;
  }
};
const get_files_and_is_max = (res, _extname) => {
  let filePaths = [];
  let files = [];
  if (!_extname || _extname.length === 0) {
    return {
      filePaths,
      files
    };
  }
  res.tempFiles.forEach((v) => {
    let fileFullName = get_file_ext(v.name);
    const extname = fileFullName.ext.toLowerCase();
    if (_extname.indexOf(extname) !== -1) {
      files.push(v);
      filePaths.push(v.path);
    }
  });
  if (files.length !== res.tempFiles.length) {
    common_vendor.index.showToast({
      title: `\u5F53\u524D\u9009\u62E9\u4E86${res.tempFiles.length}\u4E2A\u6587\u4EF6 \uFF0C${res.tempFiles.length - files.length} \u4E2A\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E`,
      icon: "none",
      duration: 5e3
    });
  }
  return {
    filePaths,
    files
  };
};
const get_file_info = (filepath) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.getImageInfo({
      src: filepath,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
const get_file_data = async (files, type = "image") => {
  let fileFullName = get_file_ext(files.name);
  const extname = fileFullName.ext.toLowerCase();
  let filedata = {
    name: files.name,
    uuid: files.uuid,
    extname: extname || "",
    cloudPath: files.cloudPath,
    fileType: files.fileType,
    url: files.path || files.path,
    size: files.size,
    image: {},
    path: files.path,
    video: {}
  };
  if (type === "image") {
    const imageinfo = await get_file_info(files.path);
    delete filedata.video;
    filedata.image.width = imageinfo.width;
    filedata.image.height = imageinfo.height;
    filedata.image.location = imageinfo.path;
  } else {
    delete filedata.image;
  }
  return filedata;
};
exports.get_extname = get_extname;
exports.get_file_data = get_file_data;
exports.get_files_and_is_max = get_files_and_is_max;
