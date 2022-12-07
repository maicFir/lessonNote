"use strict";
var uni_modules_uniDataPicker_components_uniDataPickerview_uniDataPicker = require("./uni-data-picker.js");
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniDataPickerView",
  emits: ["nodeclick", "change", "datachange", "update:modelValue"],
  mixins: [uni_modules_uniDataPicker_components_uniDataPickerview_uniDataPicker.dataPicker],
  props: {
    managedMode: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  created() {
    if (this.managedMode) {
      return;
    }
    this.$nextTick(() => {
      this.load();
    });
  },
  methods: {
    onPropsChange() {
      this._treeData = [];
      this.selectedIndex = 0;
      this.load();
    },
    load() {
      if (this.isLocaldata) {
        this.loadData();
      } else if (this.dataValue.length) {
        this.getTreePath((res) => {
          this.loadData();
        });
      }
    },
    handleSelect(index) {
      this.selectedIndex = index;
    },
    handleNodeClick(item, i, j) {
      if (item.disable) {
        return;
      }
      const node = this.dataList[i][j];
      const text = node[this.map.text];
      const value = node[this.map.value];
      if (i < this.selected.length - 1) {
        this.selected.splice(i, this.selected.length - i);
        this.selected.push({
          text,
          value
        });
      } else if (i === this.selected.length - 1) {
        this.selected.splice(i, 1, {
          text,
          value
        });
      }
      if (node.isleaf) {
        this.onSelectedChange(node, node.isleaf);
        return;
      }
      const {
        isleaf,
        hasNodes
      } = this._updateBindData();
      if (!this._isTreeView() && !hasNodes) {
        this.onSelectedChange(node, true);
        return;
      }
      if (this.isLocaldata && (!hasNodes || isleaf)) {
        this.onSelectedChange(node, true);
        return;
      }
      if (!isleaf && !hasNodes) {
        this._loadNodeData((data) => {
          if (!data.length) {
            node.isleaf = true;
          } else {
            this._treeData.push(...data);
            this._updateBindData(node);
          }
          this.onSelectedChange(node, node.isleaf);
        }, this._nodeWhere());
        return;
      }
      this.onSelectedChange(node, false);
    },
    updateData(data) {
      this._treeData = data.treeData;
      this.selected = data.selected;
      if (!this._treeData.length) {
        this.loadData();
      } else {
        this._updateBindData();
      }
    },
    onDataChange() {
      this.$emit("datachange");
    },
    onSelectedChange(node, isleaf) {
      if (isleaf) {
        this._dispatchEvent();
      }
      if (node) {
        this.$emit("nodeclick", node);
      }
    },
    _dispatchEvent() {
      this.$emit("change", this.selected.slice(0));
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f(_ctx.selected, (item, index, i0) => {
      return common_vendor.e({
        a: item.text
      }, item.text ? {
        b: common_vendor.t(item.text),
        c: index == _ctx.selectedIndex ? 1 : "",
        d: $props.ellipsis ? 1 : "",
        e: common_vendor.o(($event) => $options.handleSelect(index))
      } : {});
    }),
    b: common_vendor.f(_ctx.dataList, (child, i, i0) => {
      return common_vendor.e({
        a: i == _ctx.selectedIndex
      }, i == _ctx.selectedIndex ? {
        b: common_vendor.f(child, (item, j, i1) => {
          return common_vendor.e({
            a: common_vendor.t(item[_ctx.map.text]),
            b: _ctx.selected.length > i && item[_ctx.map.value] == _ctx.selected[i].value
          }, _ctx.selected.length > i && item[_ctx.map.value] == _ctx.selected[i].value ? {} : {}, {
            c: !!item.disable ? 1 : "",
            d: common_vendor.o(($event) => $options.handleNodeClick(item, i, j))
          });
        }),
        c: i
      } : {});
    }),
    c: _ctx.loading
  }, _ctx.loading ? {
    d: common_vendor.p({
      contentText: _ctx.loadMore,
      status: "loading"
    })
  } : {}, {
    e: _ctx.errorMessage
  }, _ctx.errorMessage ? {
    f: common_vendor.t(_ctx.errorMessage)
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-data-picker/components/uni-data-pickerview/uni-data-pickerview.vue"]]);
wx.createComponent(Component);
