"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniFilePicker_components_uniFilePicker_chooseAndUploadFile = require("./choose-and-upload-file.js");
var uni_modules_uniFilePicker_components_uniFilePicker_utils = require("./utils.js");
const uploadImage = () => "./upload-image.js";
const uploadFile = () => "./upload-file.js";
const _sfc_main = {
  name: "uniFilePicker",
  components: {
    uploadImage,
    uploadFile
  },
  options: {
    virtualHost: true
  },
  emits: ["select", "success", "fail", "progress", "delete", "update:modelValue", "input"],
  props: {
    modelValue: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disablePreview: {
      type: Boolean,
      default: false
    },
    delIcon: {
      type: Boolean,
      default: true
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    limit: {
      type: [Number, String],
      default: 9
    },
    mode: {
      type: String,
      default: "grid"
    },
    fileMediatype: {
      type: String,
      default: "image"
    },
    fileExtname: {
      type: [Array, String],
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    listStyles: {
      type: Object,
      default() {
        return {
          border: true,
          dividline: true,
          borderStyle: {}
        };
      }
    },
    imageStyles: {
      type: Object,
      default() {
        return {
          width: "auto",
          height: "auto"
        };
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    returnType: {
      type: String,
      default: "array"
    },
    sizeType: {
      type: Array,
      default() {
        return ["original", "compressed"];
      }
    }
  },
  data() {
    return {
      files: [],
      localValue: []
    };
  },
  watch: {
    modelValue: {
      handler(newVal, oldVal) {
        this.setValue(newVal, oldVal);
      },
      immediate: true
    }
  },
  computed: {
    filesList() {
      let files = [];
      this.files.forEach((v) => {
        files.push(v);
      });
      return files;
    },
    showType() {
      if (this.fileMediatype === "image") {
        return this.mode;
      }
      return "list";
    },
    limitLength() {
      if (this.returnType === "object") {
        return 1;
      }
      if (!this.limit) {
        return 1;
      }
      if (this.limit >= 9) {
        return 9;
      }
      return this.limit;
    }
  },
  created() {
    if (!(common_vendor.yn.config && common_vendor.yn.config.provider)) {
      this.noSpace = true;
      common_vendor.yn.chooseAndUploadFile = uni_modules_uniFilePicker_components_uniFilePicker_chooseAndUploadFile.chooseAndUploadFile;
    }
    this.form = this.getForm("uniForms");
    this.formItem = this.getForm("uniFormsItem");
    if (this.form && this.formItem) {
      if (this.formItem.name) {
        this.rename = this.formItem.name;
        this.form.inputChildrens.push(this);
      }
    }
  },
  methods: {
    clearFiles(index) {
      if (index !== 0 && !index) {
        this.files = [];
        this.$nextTick(() => {
          this.setEmit();
        });
      } else {
        this.files.splice(index, 1);
      }
      this.$nextTick(() => {
        this.setEmit();
      });
    },
    upload() {
      let files = [];
      this.files.forEach((v, index) => {
        if (v.status === "ready" || v.status === "error") {
          files.push(Object.assign({}, v));
        }
      });
      return this.uploadFiles(files);
    },
    async setValue(newVal, oldVal) {
      const newData = async (v) => {
        const reg = /cloud:\/\/([\w.]+\/?)\S*/;
        let url = "";
        if (v.fileID) {
          url = v.fileID;
        } else {
          url = v.url;
        }
        if (reg.test(url)) {
          v.fileID = url;
          v.url = await this.getTempFileURL(url);
        }
        if (v.url)
          v.path = v.url;
        return v;
      };
      if (this.returnType === "object") {
        if (newVal) {
          await newData(newVal);
        } else {
          newVal = {};
        }
      } else {
        if (!newVal)
          newVal = [];
        for (let i = 0; i < newVal.length; i++) {
          let v = newVal[i];
          await newData(v);
        }
      }
      this.localValue = newVal;
      if (this.form && this.formItem && !this.is_reset) {
        this.is_reset = false;
        this.formItem.setValue(this.localValue);
      }
      let filesData = Object.keys(newVal).length > 0 ? newVal : [];
      this.files = [].concat(filesData);
    },
    choose() {
      if (this.disabled)
        return;
      if (this.files.length >= Number(this.limitLength) && this.showType !== "grid" && this.returnType === "array") {
        common_vendor.index.showToast({
          title: `\u60A8\u6700\u591A\u9009\u62E9 ${this.limitLength} \u4E2A\u6587\u4EF6`,
          icon: "none"
        });
        return;
      }
      this.chooseFiles();
    },
    chooseFiles() {
      const _extname = uni_modules_uniFilePicker_components_uniFilePicker_utils.get_extname(this.fileExtname);
      common_vendor.yn.chooseAndUploadFile({
        type: this.fileMediatype,
        compressed: false,
        sizeType: this.sizeType,
        extension: _extname.length > 0 ? _extname : void 0,
        count: this.limitLength - this.files.length,
        onChooseFile: this.chooseFileCallback,
        onUploadProgress: (progressEvent) => {
          this.setProgress(progressEvent, progressEvent.index);
        }
      }).then((result) => {
        this.setSuccessAndError(result.tempFiles);
      }).catch((err) => {
        console.log("\u9009\u62E9\u5931\u8D25", err);
      });
    },
    async chooseFileCallback(res) {
      const _extname = uni_modules_uniFilePicker_components_uniFilePicker_utils.get_extname(this.fileExtname);
      const is_one = Number(this.limitLength) === 1 && this.disablePreview && !this.disabled || this.returnType === "object";
      if (is_one) {
        this.files = [];
      }
      let {
        filePaths,
        files
      } = uni_modules_uniFilePicker_components_uniFilePicker_utils.get_files_and_is_max(res, _extname);
      if (!(_extname && _extname.length > 0)) {
        filePaths = res.tempFilePaths;
        files = res.tempFiles;
      }
      let currentData = [];
      for (let i = 0; i < files.length; i++) {
        if (this.limitLength - this.files.length <= 0)
          break;
        files[i].uuid = Date.now();
        let filedata = await uni_modules_uniFilePicker_components_uniFilePicker_utils.get_file_data(files[i], this.fileMediatype);
        filedata.progress = 0;
        filedata.status = "ready";
        this.files.push(filedata);
        currentData.push(__spreadProps(__spreadValues({}, filedata), {
          file: files[i]
        }));
      }
      this.$emit("select", {
        tempFiles: currentData,
        tempFilePaths: filePaths
      });
      res.tempFiles = files;
      if (!this.autoUpload || this.noSpace) {
        res.tempFiles = [];
      }
    },
    uploadFiles(files) {
      files = [].concat(files);
      return uni_modules_uniFilePicker_components_uniFilePicker_chooseAndUploadFile.uploadCloudFiles.call(this, files, 5, (res) => {
        this.setProgress(res, res.index, true);
      }).then((result) => {
        this.setSuccessAndError(result);
        return result;
      }).catch((err) => {
        console.log(err);
      });
    },
    async setSuccessAndError(res, fn) {
      let successData = [];
      let errorData = [];
      let tempFilePath = [];
      let errorTempFilePath = [];
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const index = item.uuid ? this.files.findIndex((p) => p.uuid === item.uuid) : item.index;
        if (index === -1 || !this.files)
          break;
        if (item.errMsg === "request:fail") {
          this.files[index].url = item.path;
          this.files[index].status = "error";
          this.files[index].errMsg = item.errMsg;
          errorData.push(this.files[index]);
          errorTempFilePath.push(this.files[index].url);
        } else {
          this.files[index].errMsg = "";
          this.files[index].fileID = item.url;
          const reg = /cloud:\/\/([\w.]+\/?)\S*/;
          if (reg.test(item.url)) {
            this.files[index].url = await this.getTempFileURL(item.url);
          } else {
            this.files[index].url = item.url;
          }
          this.files[index].status = "success";
          this.files[index].progress += 1;
          successData.push(this.files[index]);
          tempFilePath.push(this.files[index].fileID);
        }
      }
      if (successData.length > 0) {
        this.setEmit();
        this.$emit("success", {
          tempFiles: this.backObject(successData),
          tempFilePaths: tempFilePath
        });
      }
      if (errorData.length > 0) {
        this.$emit("fail", {
          tempFiles: this.backObject(errorData),
          tempFilePaths: errorTempFilePath
        });
      }
    },
    setProgress(progressEvent, index, type) {
      this.files.length;
      const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
      let idx = index;
      if (!type) {
        idx = this.files.findIndex((p) => p.uuid === progressEvent.tempFile.uuid);
      }
      if (idx === -1 || !this.files[idx])
        return;
      this.files[idx].progress = percentCompleted - 1;
      this.$emit("progress", {
        index: idx,
        progress: parseInt(percentCompleted),
        tempFile: this.files[idx]
      });
    },
    delFile(index) {
      this.$emit("delete", {
        tempFile: this.files[index],
        tempFilePath: this.files[index].url
      });
      this.files.splice(index, 1);
      this.$nextTick(() => {
        this.setEmit();
      });
    },
    getFileExt(name) {
      const last_len = name.lastIndexOf(".");
      const len = name.length;
      return {
        name: name.substring(0, last_len),
        ext: name.substring(last_len + 1, len)
      };
    },
    setEmit() {
      let data = [];
      if (this.returnType === "object") {
        data = this.backObject(this.files)[0];
        this.localValue = data ? data : null;
      } else {
        data = this.backObject(this.files);
        if (!this.localValue) {
          this.localValue = [];
        }
        this.localValue = [...data];
      }
      this.$emit("update:modelValue", this.localValue);
    },
    backObject(files) {
      let newFilesData = [];
      files.forEach((v) => {
        newFilesData.push({
          extname: v.extname,
          fileType: v.fileType,
          image: v.image,
          name: v.name,
          path: v.path,
          size: v.size,
          fileID: v.fileID,
          url: v.url
        });
      });
      return newFilesData;
    },
    async getTempFileURL(fileList) {
      fileList = {
        fileList: [].concat(fileList)
      };
      const urls = await common_vendor.yn.getTempFileURL(fileList);
      return urls.fileList[0].tempFileURL || "";
    },
    getForm(name = "uniForms") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    }
  }
};
if (!Array) {
  const _component_upload_image = common_vendor.resolveComponent("upload-image");
  const _component_upload_file = common_vendor.resolveComponent("upload-file");
  (_component_upload_image + _component_upload_file)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.title
  }, $props.title ? {
    b: common_vendor.t($props.title),
    c: common_vendor.t($options.filesList.length),
    d: common_vendor.t($options.limitLength)
  } : {}, {
    e: $props.fileMediatype === "image" && $options.showType === "grid"
  }, $props.fileMediatype === "image" && $options.showType === "grid" ? {
    f: common_vendor.o($options.uploadFiles),
    g: common_vendor.o($options.choose),
    h: common_vendor.o($options.delFile),
    i: common_vendor.p({
      readonly: $props.readonly,
      ["image-styles"]: $props.imageStyles,
      ["files-list"]: $options.filesList,
      limit: $options.limitLength,
      disablePreview: $props.disablePreview,
      delIcon: $props.delIcon
    })
  } : {}, {
    j: $props.fileMediatype !== "image" || $options.showType !== "grid"
  }, $props.fileMediatype !== "image" || $options.showType !== "grid" ? {
    k: common_vendor.o($options.uploadFiles),
    l: common_vendor.o($options.choose),
    m: common_vendor.o($options.delFile),
    n: common_vendor.p({
      readonly: $props.readonly,
      ["list-styles"]: $props.listStyles,
      ["files-list"]: $options.filesList,
      showType: $options.showType,
      delIcon: $props.delIcon
    })
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue"]]);
wx.createComponent(Component);
