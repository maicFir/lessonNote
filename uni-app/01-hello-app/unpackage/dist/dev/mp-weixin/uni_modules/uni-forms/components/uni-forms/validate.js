"use strict";
var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i")
};
const FORMAT_MAPPING = {
  "int": "integer",
  "bool": "boolean",
  "double": "number",
  "long": "number",
  "password": "string"
};
function formatMessage(args, resources = "") {
  var defaultMessage = ["label"];
  defaultMessage.forEach((item) => {
    if (args[item] === void 0) {
      args[item] = "";
    }
  });
  let str = resources;
  for (let key in args) {
    let reg = new RegExp("{" + key + "}");
    str = str.replace(reg, args[key]);
  }
  return str;
}
function isEmptyValue(value, type) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (typeof value === "string" && !value) {
    return true;
  }
  if (Array.isArray(value) && !value.length) {
    return true;
  }
  if (type === "object" && !Object.keys(value).length) {
    return true;
  }
  return false;
}
const types = {
  integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string(value) {
    return typeof value === "string";
  },
  number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  "boolean": function(value) {
    return typeof value === "boolean";
  },
  "float": function(value) {
    return types.number(value) && !types.integer(value);
  },
  array(value) {
    return Array.isArray(value);
  },
  object(value) {
    return typeof value === "object" && !types.array(value);
  },
  date(value) {
    return value instanceof Date;
  },
  timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file(value) {
    return typeof value.url === "string";
  },
  email(value) {
    return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
  },
  url(value) {
    return typeof value === "string" && !!value.match(pattern.url);
  },
  pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method(value) {
    return typeof value === "function";
  },
  idcard(value) {
    return typeof value === "string" && !!value.match(pattern.idcard);
  },
  "url-https"(value) {
    return this.url(value) && value.startsWith("https://");
  },
  "url-scheme"(value) {
    return value.startsWith("://");
  },
  "url-web"(value) {
    return false;
  }
};
class RuleValidator {
  constructor(message) {
    this._message = message;
  }
  async validateRule(fieldKey, fieldValue, value, data, allData) {
    var result = null;
    let rules = fieldValue.rules;
    let hasRequired = rules.findIndex((item) => {
      return item.required;
    });
    if (hasRequired < 0) {
      if (value === null || value === void 0) {
        return result;
      }
      if (typeof value === "string" && !value.length) {
        return result;
      }
    }
    var message = this._message;
    if (rules === void 0) {
      return message["default"];
    }
    for (var i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let vt = this._getValidateType(rule);
      Object.assign(rule, {
        label: fieldValue.label || `["${fieldKey}"]`
      });
      if (RuleValidatorHelper[vt]) {
        result = RuleValidatorHelper[vt](rule, value, message);
        if (result != null) {
          break;
        }
      }
      if (rule.validateExpr) {
        let now = Date.now();
        let resultExpr = rule.validateExpr(value, allData, now);
        if (resultExpr === false) {
          result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
          break;
        }
      }
      if (rule.validateFunction) {
        result = await this.validateFunction(rule, value, data, allData, vt);
        if (result !== null) {
          break;
        }
      }
    }
    if (result !== null) {
      result = message.TAG + result;
    }
    return result;
  }
  async validateFunction(rule, value, data, allData, vt) {
    let result = null;
    try {
      let callbackMessage = null;
      const res = await rule.validateFunction(rule, value, allData || data, (message) => {
        callbackMessage = message;
      });
      if (callbackMessage || typeof res === "string" && res || res === false) {
        result = this._getMessage(rule, callbackMessage || res, vt);
      }
    } catch (e) {
      result = this._getMessage(rule, e.message, vt);
    }
    return result;
  }
  _getMessage(rule, message, vt) {
    return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
  }
  _getValidateType(rule) {
    var result = "";
    if (rule.required) {
      result = "required";
    } else if (rule.format) {
      result = "format";
    } else if (rule.arrayType) {
      result = "arrayTypeFormat";
    } else if (rule.range) {
      result = "range";
    } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
      result = "rangeNumber";
    } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
      result = "rangeLength";
    } else if (rule.pattern) {
      result = "pattern";
    } else if (rule.validateFunction) {
      result = "validateFunction";
    }
    return result;
  }
}
const RuleValidatorHelper = {
  required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }
    return null;
  },
  range(rule, value, message) {
    const {
      range,
      errorMessage
    } = rule;
    let list = new Array(range.length);
    for (let i = 0; i < range.length; i++) {
      const item = range[i];
      if (types.object(item) && item.value !== void 0) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }
    let result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }
    if (!result) {
      return formatMessage(rule, errorMessage || message["enum"]);
    }
    return null;
  },
  rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }
    let {
      minimum,
      maximum,
      exclusiveMinimum,
      exclusiveMaximum
    } = rule;
    let min = exclusiveMinimum ? value <= minimum : value < minimum;
    let max = exclusiveMaximum ? value >= maximum : value > maximum;
    if (minimum !== void 0 && min) {
      return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
    } else if (maximum !== void 0 && max) {
      return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
    } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message["number"].range);
    }
    return null;
  },
  rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }
    let min = rule.minLength;
    let max = rule.maxLength;
    let val = value.length;
    if (min !== void 0 && val < min) {
      return formatMessage(rule, rule.errorMessage || message["length"].minLength);
    } else if (max !== void 0 && val > max) {
      return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
    } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message["length"].range);
    }
    return null;
  },
  pattern(rule, value, message) {
    if (!types["pattern"](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }
    return null;
  },
  format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }
    return null;
  },
  arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      let formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }
    return null;
  }
};
class SchemaValidator extends RuleValidator {
  constructor(schema, options) {
    super(SchemaValidator.message);
    this._schema = schema;
    this._options = options || null;
  }
  updateSchema(schema) {
    this._schema = schema;
  }
  async validate(data, allData) {
    let result = this._checkFieldInSchema(data);
    if (!result) {
      result = await this.invokeValidate(data, false, allData);
    }
    return result.length ? result[0] : null;
  }
  async validateAll(data, allData) {
    let result = this._checkFieldInSchema(data);
    if (!result) {
      result = await this.invokeValidate(data, true, allData);
    }
    return result;
  }
  async validateUpdate(data, allData) {
    let result = this._checkFieldInSchema(data);
    if (!result) {
      result = await this.invokeValidateUpdate(data, false, allData);
    }
    return result.length ? result[0] : null;
  }
  async invokeValidate(data, all, allData) {
    let result = [];
    let schema = this._schema;
    for (let key in schema) {
      let value = schema[key];
      let errorMessage = await this.validateRule(key, value, data[key], data, allData);
      if (errorMessage != null) {
        result.push({
          key,
          errorMessage
        });
        if (!all)
          break;
      }
    }
    return result;
  }
  async invokeValidateUpdate(data, all, allData) {
    let result = [];
    for (let key in data) {
      let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
      if (errorMessage != null) {
        result.push({
          key,
          errorMessage
        });
        if (!all)
          break;
      }
    }
    return result;
  }
  _checkFieldInSchema(data) {
    var keys = Object.keys(data);
    var keys2 = Object.keys(this._schema);
    if (new Set(keys.concat(keys2)).size === keys2.length) {
      return "";
    }
    var noExistFields = keys.filter((key) => {
      return keys2.indexOf(key) < 0;
    });
    var errorMessage = formatMessage({
      field: JSON.stringify(noExistFields)
    }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
    return [{
      key: "invalid",
      errorMessage
    }];
  }
}
function Message() {
  return {
    TAG: "",
    default: "\u9A8C\u8BC1\u9519\u8BEF",
    defaultInvalid: "\u63D0\u4EA4\u7684\u5B57\u6BB5{field}\u5728\u6570\u636E\u5E93\u4E2D\u5E76\u4E0D\u5B58\u5728",
    validateFunction: "\u9A8C\u8BC1\u65E0\u6548",
    required: "{label}\u5FC5\u586B",
    "enum": "{label}\u8D85\u51FA\u8303\u56F4",
    timestamp: "{label}\u683C\u5F0F\u65E0\u6548",
    whitespace: "{label}\u4E0D\u80FD\u4E3A\u7A7A",
    typeError: "{label}\u7C7B\u578B\u65E0\u6548",
    date: {
      format: "{label}\u65E5\u671F{value}\u683C\u5F0F\u65E0\u6548",
      parse: "{label}\u65E5\u671F\u65E0\u6CD5\u89E3\u6790,{value}\u65E0\u6548",
      invalid: "{label}\u65E5\u671F{value}\u65E0\u6548"
    },
    length: {
      minLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E{minLength}",
      maxLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7{maxLength}",
      range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minLength}\u548C{maxLength}\u4E4B\u95F4"
    },
    number: {
      minimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E{minimum}",
      maximum: "{label}\u4E0D\u80FD\u5927\u4E8E{maximum}",
      exclusiveMinimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E\u7B49\u4E8E{minimum}",
      exclusiveMaximum: "{label}\u4E0D\u80FD\u5927\u4E8E\u7B49\u4E8E{maximum}",
      range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minimum}and{maximum}\u4E4B\u95F4"
    },
    pattern: {
      mismatch: "{label}\u683C\u5F0F\u4E0D\u5339\u914D"
    }
  };
}
SchemaValidator.message = new Message();
exports.SchemaValidator = SchemaValidator;
