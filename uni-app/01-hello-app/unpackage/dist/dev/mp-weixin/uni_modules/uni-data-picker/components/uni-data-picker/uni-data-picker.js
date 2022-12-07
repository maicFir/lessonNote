"use strict";
var uni_modules_uniDataPicker_components_uniDataPickerview_uniDataPicker = require("../uni-data-pickerview/uni-data-picker.js");
var common_vendor = require("../../../../common/vendor.js");
const DataPickerView = () => "../uni-data-pickerview/uni-data-pickerview.js";
const _sfc_main = {
  name: "UniDataPicker",
  emits: ["popupopened", "popupclosed", "nodeclick", "input", "change", "update:modelValue"],
  mixins: [uni_modules_uniDataPicker_components_uniDataPickerview_uniDataPicker.dataPicker],
  components: {
    DataPickerView
  },
  props: {
    options: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    popupTitle: {
      type: String,
      default: "\u8BF7\u9009\u62E9"
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9"
    },
    heightMobile: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    split: {
      type: String,
      default: "/"
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpened: false,
      inputSelected: []
    };
  },
  created() {
    this.form = this.getForm("uniForms");
    this.formItem = this.getForm("uniFormsItem");
    if (this.formItem) {
      if (this.formItem.name) {
        this.rename = this.formItem.name;
        this.form.inputChildrens.push(this);
      }
    }
    this.$nextTick(() => {
      this.load();
    });
  },
  methods: {
    clear() {
      this.inputSelected.splice(0);
      this._dispatchEvent([]);
    },
    onPropsChange() {
      this._treeData = [];
      this.selectedIndex = 0;
      this.load();
    },
    load() {
      if (this.readonly) {
        this._processReadonly(this.localdata, this.dataValue);
        return;
      }
      if (this.isLocaldata) {
        this.loadData();
        this.inputSelected = this.selected.slice(0);
      } else if (!this.parentField && !this.selfField && this.hasValue) {
        this.getNodeData(() => {
          this.inputSelected = this.selected.slice(0);
        });
      } else if (this.hasValue) {
        this.getTreePath(() => {
          this.inputSelected = this.selected.slice(0);
        });
      }
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
    },
    show() {
      this.isOpened = true;
      setTimeout(() => {
        this.$refs.pickerView.updateData({
          treeData: this._treeData,
          selected: this.selected,
          selectedIndex: this.selectedIndex
        });
      }, 200);
      this.$emit("popupopened");
    },
    hide() {
      this.isOpened = false;
      this.$emit("popupclosed");
    },
    handleInput() {
      if (this.readonly) {
        return;
      }
      this.show();
    },
    handleClose(e) {
      this.hide();
    },
    onnodeclick(e) {
      this.$emit("nodeclick", e);
    },
    ondatachange(e) {
      this._treeData = this.$refs.pickerView._treeData;
    },
    onchange(e) {
      this.hide();
      this.$nextTick(() => {
        this.inputSelected = e;
      });
      this._dispatchEvent(e);
    },
    _processReadonly(dataList, value) {
      var isTree = dataList.findIndex((item2) => {
        return item2.children;
      });
      if (isTree > -1) {
        let inputValue;
        if (Array.isArray(value)) {
          inputValue = value[value.length - 1];
          if (typeof inputValue === "object" && inputValue.value) {
            inputValue = inputValue.value;
          }
        } else {
          inputValue = value;
        }
        this.inputSelected = this._findNodePath(inputValue, this.localdata);
        return;
      }
      if (!this.hasValue) {
        this.inputSelected = [];
        return;
      }
      let result = [];
      for (let i = 0; i < value.length; i++) {
        var val = value[i];
        var item = dataList.find((v) => {
          return v.value == val;
        });
        if (item) {
          result.push(item);
        }
      }
      if (result.length) {
        this.inputSelected = result;
      }
    },
    _filterForArray(data, valueArray) {
      var result = [];
      for (let i = 0; i < valueArray.length; i++) {
        var value = valueArray[i];
        var found = data.find((item) => {
          return item.value == value;
        });
        if (found) {
          result.push(found);
        }
      }
      return result;
    },
    _dispatchEvent(selected) {
      let item = {};
      if (selected.length) {
        var value = new Array(selected.length);
        for (var i = 0; i < selected.length; i++) {
          value[i] = selected[i].value;
        }
        item = selected[selected.length - 1];
      } else {
        item.value = "";
      }
      if (this.formItem) {
        this.formItem.setValue(item.value);
      }
      this.$emit("input", item.value);
      this.$emit("update:modelValue", item.value);
      this.$emit("change", {
        detail: {
          value: selected
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_data_picker_view = common_vendor.resolveComponent("data-picker-view");
  (_easycom_uni_load_more2 + _easycom_uni_icons2 + _component_data_picker_view)();
}
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.errorMessage
  }, _ctx.errorMessage ? {
    b: common_vendor.t(_ctx.errorMessage)
  } : _ctx.loading && !$data.isOpened ? {
    d: common_vendor.p({
      contentText: _ctx.loadMore,
      status: "loading"
    })
  } : $data.inputSelected.length ? {
    f: common_vendor.f($data.inputSelected, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.text),
        b: index < $data.inputSelected.length - 1
      }, index < $data.inputSelected.length - 1 ? {
        c: common_vendor.t($props.split)
      } : {}, {
        d: index
      });
    })
  } : {
    g: common_vendor.t($props.placeholder)
  }, {
    c: _ctx.loading && !$data.isOpened,
    e: $data.inputSelected.length,
    h: $props.clearIcon && !$props.readonly && $data.inputSelected.length
  }, $props.clearIcon && !$props.readonly && $data.inputSelected.length ? {
    i: common_vendor.p({
      type: "clear",
      color: "#c0c4cc",
      size: "24"
    }),
    j: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    k: (!$props.clearIcon || !$data.inputSelected.length) && !$props.readonly
  }, (!$props.clearIcon || !$data.inputSelected.length) && !$props.readonly ? {} : {}, {
    l: $props.border ? 1 : "",
    m: common_vendor.r("d", {
      options: $props.options,
      data: $data.inputSelected,
      error: _ctx.errorMessage
    }),
    n: common_vendor.o((...args) => $options.handleInput && $options.handleInput(...args)),
    o: $data.isOpened
  }, $data.isOpened ? {
    p: common_vendor.o((...args) => $options.handleClose && $options.handleClose(...args))
  } : {}, {
    q: $data.isOpened
  }, $data.isOpened ? {
    r: common_vendor.t($props.popupTitle),
    s: common_vendor.o((...args) => $options.handleClose && $options.handleClose(...args)),
    t: common_vendor.sr("pickerView", "3229ca0a-2"),
    v: common_vendor.o($options.onchange),
    w: common_vendor.o($options.ondatachange),
    x: common_vendor.o($options.onnodeclick),
    y: common_vendor.o(($event) => _ctx.dataValue = $event),
    z: common_vendor.p({
      localdata: _ctx.localdata,
      preload: _ctx.preload,
      collection: _ctx.collection,
      field: _ctx.field,
      orderby: _ctx.orderby,
      where: _ctx.where,
      ["step-searh"]: _ctx.stepSearh,
      ["self-field"]: _ctx.selfField,
      ["parent-field"]: _ctx.parentField,
      ["managed-mode"]: true,
      map: _ctx.map,
      ellipsis: $props.ellipsis,
      modelValue: _ctx.dataValue
    })
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.vue"]]);
wx.createComponent(Component);
