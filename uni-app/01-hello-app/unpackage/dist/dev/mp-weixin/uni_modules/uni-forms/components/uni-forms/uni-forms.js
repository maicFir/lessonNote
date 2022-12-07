"use strict";
var uni_modules_uniForms_components_uniForms_validate = require("./validate.js");
var uni_modules_uniForms_components_uniForms_utils = require("./utils.js");
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniForms",
  emits: ["validate", "submit"],
  options: {
    virtualHost: true
  },
  props: {
    value: {
      type: Object,
      default() {
        return null;
      }
    },
    modelValue: {
      type: Object,
      default() {
        return null;
      }
    },
    model: {
      type: Object,
      default() {
        return null;
      }
    },
    rules: {
      type: Object,
      default() {
        return {};
      }
    },
    errShowType: {
      type: String,
      default: "undertext"
    },
    validateTrigger: {
      type: String,
      default: "submit"
    },
    labelPosition: {
      type: String,
      default: "left"
    },
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    labelAlign: {
      type: String,
      default: "left"
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      uniForm: this
    };
  },
  data() {
    return {
      formData: {},
      formRules: {}
    };
  },
  computed: {
    localData() {
      const localVal = this.model || this.modelValue || this.value;
      if (localVal) {
        return uni_modules_uniForms_components_uniForms_utils.deepCopy(localVal);
      }
      return {};
    }
  },
  watch: {
    rules: {
      handler: function(val, oldVal) {
        this.setRules(val);
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
    if (!getbinddata) {
      getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
        if (formName) {
          this.$refs[formName].setValue(name, value);
        } else {
          let formVm;
          for (let i in this.$refs) {
            const vm = this.$refs[i];
            if (vm && vm.$options && vm.$options.name === "uniForms") {
              formVm = vm;
              break;
            }
          }
          if (!formVm)
            return console.error("\u5F53\u524D uni-froms \u7EC4\u4EF6\u7F3A\u5C11 ref \u5C5E\u6027");
          formVm.setValue(name, value);
        }
      };
    }
    this.childrens = [];
    this.inputChildrens = [];
    this.setRules(this.rules);
  },
  methods: {
    setRules(rules) {
      this.formRules = Object.assign({}, this.formRules, rules);
      this.validator = new uni_modules_uniForms_components_uniForms_validate.SchemaValidator(rules);
    },
    setValue(key, value) {
      let example = this.childrens.find((child) => child.name === key);
      if (!example)
        return null;
      this.formData[key] = uni_modules_uniForms_components_uniForms_utils.getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
      return example.onFieldChange(this.formData[key]);
    },
    validate(keepitem, callback) {
      return this.checkAll(this.formData, keepitem, callback);
    },
    validateField(props = [], callback) {
      props = [].concat(props);
      let invalidFields = {};
      this.childrens.forEach((item) => {
        const name = uni_modules_uniForms_components_uniForms_utils.realName(item.name);
        if (props.indexOf(name) !== -1) {
          invalidFields = Object.assign({}, invalidFields, {
            [name]: this.formData[name]
          });
        }
      });
      return this.checkAll(invalidFields, [], callback);
    },
    clearValidate(props = []) {
      props = [].concat(props);
      this.childrens.forEach((item) => {
        if (props.length === 0) {
          item.errMsg = "";
        } else {
          const name = uni_modules_uniForms_components_uniForms_utils.realName(item.name);
          if (props.indexOf(name) !== -1) {
            item.errMsg = "";
          }
        }
      });
    },
    submit(keepitem, callback, type) {
      for (let i in this.dataValue) {
        const itemData = this.childrens.find((v) => v.name === i);
        if (itemData) {
          if (this.formData[i] === void 0) {
            this.formData[i] = this._getValue(i, this.dataValue[i]);
          }
        }
      }
      if (!type) {
        console.warn("submit \u65B9\u6CD5\u5373\u5C06\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528validate\u65B9\u6CD5\u4EE3\u66FF\uFF01");
      }
      return this.checkAll(this.formData, keepitem, callback, "submit");
    },
    async checkAll(invalidFields, keepitem, callback, type) {
      if (!this.validator)
        return;
      let childrens = [];
      for (let i in invalidFields) {
        const item = this.childrens.find((v) => uni_modules_uniForms_components_uniForms_utils.realName(v.name) === i);
        if (item) {
          childrens.push(item);
        }
      }
      if (!callback && typeof keepitem === "function") {
        callback = keepitem;
      }
      let promise;
      if (!callback && typeof callback !== "function" && Promise) {
        promise = new Promise((resolve, reject) => {
          callback = function(valid, invalidFields2) {
            !valid ? resolve(invalidFields2) : reject(valid);
          };
        });
      }
      let results = [];
      let tempFormData = JSON.parse(JSON.stringify(invalidFields));
      for (let i in childrens) {
        const child = childrens[i];
        let name = uni_modules_uniForms_components_uniForms_utils.realName(child.name);
        const result = await child.onFieldChange(tempFormData[name]);
        if (result) {
          results.push(result);
          if (this.errShowType === "toast" || this.errShowType === "modal")
            break;
        }
      }
      if (Array.isArray(results)) {
        if (results.length === 0)
          results = null;
      }
      if (Array.isArray(keepitem)) {
        keepitem.forEach((v) => {
          let vName = uni_modules_uniForms_components_uniForms_utils.realName(v);
          let value = uni_modules_uniForms_components_uniForms_utils.getDataValue(v, this.localData);
          if (value !== void 0) {
            tempFormData[vName] = value;
          }
        });
      }
      if (type === "submit") {
        this.$emit("submit", {
          detail: {
            value: tempFormData,
            errors: results
          }
        });
      } else {
        this.$emit("validate", results);
      }
      let resetFormData = {};
      resetFormData = uni_modules_uniForms_components_uniForms_utils.rawData(tempFormData, this.name);
      callback && typeof callback === "function" && callback(results, resetFormData);
      if (promise && callback) {
        return promise;
      } else {
        return null;
      }
    },
    validateCheck(result) {
      this.$emit("validate", result);
    },
    _getValue: uni_modules_uniForms_components_uniForms_utils.getValue,
    _isRequiredField: uni_modules_uniForms_components_uniForms_utils.isRequiredField,
    _setDataValue: uni_modules_uniForms_components_uniForms_utils.setDataValue,
    _getDataValue: uni_modules_uniForms_components_uniForms_utils.getDataValue,
    _realName: uni_modules_uniForms_components_uniForms_utils.realName,
    _isRealName: uni_modules_uniForms_components_uniForms_utils.isRealName,
    _isEqual: uni_modules_uniForms_components_uniForms_utils.isEqual
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
wx.createComponent(Component);
