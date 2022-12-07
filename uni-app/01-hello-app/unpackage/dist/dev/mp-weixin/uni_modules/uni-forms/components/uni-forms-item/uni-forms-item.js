"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniFormsItem",
  options: {
    virtualHost: true
  },
  provide() {
    return {
      uniFormItem: this
    };
  },
  inject: {
    form: {
      from: "uniForm",
      default: null
    }
  },
  props: {
    rules: {
      type: Array,
      default() {
        return null;
      }
    },
    name: {
      type: [String, Array],
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    labelAlign: {
      type: String,
      default: ""
    },
    errorMessage: {
      type: [String, Boolean],
      default: ""
    },
    leftIcon: String,
    iconColor: {
      type: String,
      default: "#606266"
    }
  },
  data() {
    return {
      errMsg: "",
      isRequired: false,
      userRules: null,
      localLabelAlign: "left",
      localLabelWidth: "65px",
      localLabelPos: "left",
      border: false,
      isFirstBorder: false
    };
  },
  computed: {
    msg() {
      return this.errorMessage || this.errMsg;
    }
  },
  watch: {
    "form.formRules"(val) {
      this.init();
    },
    "form.labelWidth"(val) {
      this.localLabelWidth = this._labelWidthUnit(val);
    },
    "form.labelPosition"(val) {
      this.localLabelPos = this._labelPosition();
    },
    "form.labelAlign"(val) {
    }
  },
  created() {
    this.init(true);
    if (this.name && this.form) {
      this.$watch(() => {
        const val = this.form._getDataValue(this.name, this.form.localData);
        return val;
      }, (value, oldVal) => {
        const isEqual = this.form._isEqual(value, oldVal);
        if (!isEqual) {
          const val = this.itemSetValue(value);
          this.onFieldChange(val, false);
        }
      }, {
        immediate: false
      });
    }
  },
  unmounted() {
    this.__isUnmounted = true;
    this.unInit();
  },
  methods: {
    setRules(rules = null) {
      this.userRules = rules;
      this.init(false);
    },
    setValue() {
    },
    async onFieldChange(value, formtrigger = true) {
      const {
        formData,
        localData,
        errShowType,
        validateCheck,
        validateTrigger,
        _isRequiredField,
        _realName
      } = this.form;
      const name = _realName(this.name);
      if (!value) {
        value = this.form.formData[name];
      }
      const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
      if (!this.validator || !ruleLen || ruleLen === 0)
        return;
      const isRequiredField = _isRequiredField(this.itemRules.rules || []);
      let result = null;
      if (validateTrigger === "bind" || formtrigger) {
        result = await this.validator.validateUpdate({
          [name]: value
        }, formData);
        if (!isRequiredField && (value === void 0 || value === "")) {
          result = null;
        }
        if (result && result.errorMessage) {
          if (errShowType === "undertext") {
            this.errMsg = !result ? "" : result.errorMessage;
          }
          if (errShowType === "toast") {
            common_vendor.index.showToast({
              title: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF",
              icon: "none"
            });
          }
          if (errShowType === "modal") {
            common_vendor.index.showModal({
              title: "\u63D0\u793A",
              content: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF"
            });
          }
        } else {
          this.errMsg = "";
        }
        validateCheck(result ? result : null);
      } else {
        this.errMsg = "";
      }
      return result ? result : null;
    },
    init(type = false) {
      const {
        validator,
        formRules,
        childrens,
        formData,
        localData,
        _realName,
        labelWidth,
        _getDataValue,
        _setDataValue
      } = this.form || {};
      this.localLabelAlign = this._justifyContent();
      this.localLabelWidth = this._labelWidthUnit(labelWidth);
      this.localLabelPos = this._labelPosition();
      this.isRequired = this.required;
      this.form && type && childrens.push(this);
      if (!validator || !formRules)
        return;
      if (!this.form.isFirstBorder) {
        this.form.isFirstBorder = true;
        this.isFirstBorder = true;
      }
      if (this.group) {
        if (!this.group.isFirstBorder) {
          this.group.isFirstBorder = true;
          this.isFirstBorder = true;
        }
      }
      this.border = this.form.border;
      const name = _realName(this.name);
      const itemRule = this.userRules || this.rules;
      if (typeof formRules === "object" && itemRule) {
        formRules[name] = {
          rules: itemRule
        };
        validator.updateSchema(formRules);
      }
      const itemRules = formRules[name] || {};
      this.itemRules = itemRules;
      this.validator = validator;
      this.itemSetValue(_getDataValue(this.name, localData));
      this.isRequired = this._isRequired();
    },
    unInit() {
      if (this.form) {
        const {
          childrens,
          formData,
          _realName
        } = this.form;
        childrens.forEach((item, index) => {
          if (item === this) {
            this.form.childrens.splice(index, 1);
            delete formData[_realName(item.name)];
          }
        });
      }
    },
    itemSetValue(value) {
      const name = this.form._realName(this.name);
      const rules = this.itemRules.rules || [];
      const val = this.form._getValue(name, value, rules);
      this.form._setDataValue(name, this.form.formData, val);
      return val;
    },
    clearValidate() {
      this.errMsg = "";
    },
    _isRequired() {
      if (this.form) {
        return this.required || this.form._isRequiredField(this.itemRules.rules || []);
      }
      return this.required;
    },
    _justifyContent() {
      if (this.form) {
        const {
          labelAlign
        } = this.form;
        let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
        if (labelAli === "left")
          return "flex-start";
        if (labelAli === "center")
          return "center";
        if (labelAli === "right")
          return "flex-end";
      }
      return "flex-start";
    },
    _labelWidthUnit(labelWidth) {
      return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 65 : "auto"));
    },
    _labelPosition() {
      if (this.form)
        return this.form.labelPosition || "left";
      return "left";
    },
    isTrigger(rule, itemRlue, parentRule) {
      if (rule === "submit" || !rule) {
        if (rule === void 0) {
          if (itemRlue !== "bind") {
            if (!itemRlue) {
              return parentRule === "" ? "bind" : "submit";
            }
            return "submit";
          }
          return "bind";
        }
        return "submit";
      }
      return "bind";
    },
    num2px(num) {
      if (typeof num === "number") {
        return `${num}px`;
      }
      return num;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isRequired
  }, $data.isRequired ? {} : {}, {
    b: common_vendor.t($props.label),
    c: !$props.label && !$data.isRequired ? 1 : "",
    d: $data.localLabelWidth,
    e: $data.localLabelAlign,
    f: common_vendor.t($options.msg),
    g: $options.msg ? 1 : "",
    h: common_vendor.n("is-direction-" + $data.localLabelPos),
    i: common_vendor.n($data.border ? "uni-forms-item--border" : ""),
    j: common_vendor.n($data.border && $data.isFirstBorder ? "is-first-border" : "")
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
wx.createComponent(Component);
