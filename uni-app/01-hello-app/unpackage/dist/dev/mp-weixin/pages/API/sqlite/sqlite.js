"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "SQLite"
    };
  },
  methods: {
    openDB: function() {
      plus.sqlite.openDatabase({
        name: "first",
        path: "_doc/test.db",
        success: function(e) {
          plus.nativeUI.alert("\u6253\u5F00\u6570\u636E\u5E93test.db\u6210\u529F ");
        },
        fail: function(e) {
          plus.nativeUI.alert("\u6253\u5F00\u6570\u636E\u5E93test.db\u5931\u8D25: " + JSON.stringify(e));
        }
      });
    },
    executeSQL: function() {
      plus.sqlite.executeSql({
        name: "first",
        sql: 'create table if not exists database("name" CHAR(110),"sex" CHAR(10),"age" INT(11))',
        success: function(e) {
          plus.sqlite.executeSql({
            name: "first",
            sql: "insert into database values('\u5F66','\u5973','7000')",
            success: function(e2) {
              plus.nativeUI.alert("\u521B\u5EFA\u8868table\u548C\u63D2\u5165\u6570\u636E\u6210\u529F");
            },
            fail: function(e2) {
              plus.nativeUI.alert("\u521B\u5EFA\u8868table\u6210\u529F\u4F46\u63D2\u5165\u6570\u636E\u5931\u8D25: " + JSON.stringify(e2));
            }
          });
        },
        fail: function(e) {
          plus.nativeUI.alert("\u521B\u5EFA\u8868table\u5931\u8D25: " + JSON.stringify(e));
        }
      });
    },
    selectSQL: function() {
      plus.sqlite.selectSql({
        name: "first",
        sql: "select * from database",
        success: function(e) {
          plus.nativeUI.alert("\u67E5\u8BE2SQL\u8BED\u53E5\u6210\u529F: " + JSON.stringify(e));
        },
        fail: function(e) {
          plus.nativeUI.alert("\u67E5\u8BE2SQL\u8BED\u53E5\u5931\u8D25: " + JSON.stringify(e));
        }
      });
    },
    droptable: function() {
      plus.sqlite.executeSql({
        name: "first",
        sql: "drop table database",
        success: function(e) {
          plus.nativeUI.alert("\u5220\u9664\u8868database\u6210\u529F");
        },
        fail: function(e) {
          plus.nativeUI.alert("\u5220\u9664\u8868database\u5931\u8D25: " + JSON.stringify(e));
        }
      });
    },
    closeDB: function() {
      plus.sqlite.closeDatabase({
        name: "first",
        success: function(e) {
          plus.nativeUI.alert("\u5173\u95ED\u6570\u636E\u5E93\u6210\u529F");
        },
        fail: function(e) {
          plus.nativeUI.alert("\u5173\u95ED\u6570\u636E\u5E93\u5931\u8D25: " + JSON.stringify(e));
        }
      });
    },
    isOpenDB: function() {
      if (plus.sqlite.isOpenDatabase({
        name: "first",
        path: "_doc/test.db"
      })) {
        plus.nativeUI.alert("Opened!");
      } else {
        plus.nativeUI.alert("Unopened!");
      }
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.openDB && $options.openDB(...args)),
    c: common_vendor.o((...args) => $options.executeSQL && $options.executeSQL(...args)),
    d: common_vendor.o((...args) => $options.selectSQL && $options.selectSQL(...args)),
    e: common_vendor.o((...args) => $options.droptable && $options.droptable(...args)),
    f: common_vendor.o((...args) => $options.closeDB && $options.closeDB(...args)),
    g: common_vendor.o((...args) => $options.isOpenDB && $options.isOpenDB(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/sqlite/sqlite.vue"]]);
wx.createPage(MiniProgramPage);
