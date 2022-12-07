"use strict";
let mpMixins = {};
mpMixins = {
  data() {
    return {
      is_show: "none"
    };
  },
  watch: {
    show(newVal) {
      this.is_show = this.show;
    }
  },
  created() {
    this.swipeaction = this.getSwipeAction();
    if (this.swipeaction.children !== void 0) {
      this.swipeaction.children.push(this);
    }
  },
  mounted() {
    this.is_show = this.show;
  },
  methods: {
    closeSwipe(e) {
      if (!this.autoClose)
        return;
      this.swipeaction.closeOther(this);
    },
    change(e) {
      this.$emit("change", e.open);
      if (this.is_show !== e.open) {
        this.is_show = e.open;
      }
    },
    appTouchStart(e) {
      const {
        clientX
      } = e.changedTouches[0];
      this.clientX = clientX;
      this.timestamp = new Date().getTime();
    },
    appTouchEnd(e, index, item, position) {
      const {
        clientX
      } = e.changedTouches[0];
      let diff = Math.abs(this.clientX - clientX);
      let time = new Date().getTime() - this.timestamp;
      if (diff < 40 && time < 300) {
        this.$emit("click", {
          content: item,
          index,
          position
        });
      }
    },
    onClickForPC(index, item, position) {
      return;
    }
  }
};
var mpwxs = mpMixins;
exports.mpwxs = mpwxs;
