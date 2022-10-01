<template>
  <div class="drap">
    <div class="left">
      <h3>原始区域{{ $route.fullPath }}</h3>
      <div class="content">
        <fieldset v-for="(item, index) in listTree" :key="index">
          <legend>{{ item.title }}</legend>
          <span
            v-for="(citem, cindex) in item.data"
            :key="cindex"
            draggable="true"
            @dragstart="handleDragStart(citem)"
            @dragend="handleDragEnd"
            >{{ citem.name }}</span
          >
        </fieldset>
      </div>
    </div>
    <div class="right">
      <div class="title-bar">
        <h3>目标区域</h3>
        <p><a href="javascript:void(0)" @click="handleClear">清除</a></p>
      </div>
      <fieldset
        :class="[
          'content content-1',
          currentActive.a ? 'content-1-border' : ''
        ]"
        data-type="a"
        @dragover="handleDragOver"
        @drop.prevent="handleDrag"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleLeave"
      >
        <legend>冠军名单</legend>
        <span
          draggable="true"
          v-for="(item, index) in targetSourceData1"
          :key="index"
          >{{ item.name }}</span
        >
      </fieldset>
      <fieldset
        :class="[
          'content content-2',
          currentActive.b ? 'content-2-border' : ''
        ]"
        data-type="b"
        @dragover.prevent="() => {}"
        @drop.prevent="handleDrag"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleLeave"
      >
        <legend>亚军名单</legend>
        <span
          draggable="true"
          v-for="(item, index) in targetSourceData2"
          :key="index"
          >{{ item.name }}</span
        >
      </fieldset>
      <fieldset
        :class="[
          'content content-3',
          currentActive.c ? 'content-3-border' : ''
        ]"
        data-type="c"
        @dragover.prevent="() => {}"
        @drop.prevent="handleDrag"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleLeave"
      >
        <legend>中奖名单</legend>
        <span
          v-for="(item, index) in targetSourceData3"
          :key="index"
          draggable="true"
          :data-index="index"
          >{{ item.name }}</span
        >
      </fieldset>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs';
const randomData = (len, type) => {
  const result = new Array(len).fill(1);
  return result.map(() => {
    return {
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      type
    };
  });
};
const sourceData1 = Mock.mock({
  list: randomData(10, 'a')
});
const sourceData2 = Mock.mock({
  list: randomData(10, 'b')
});

export default {
  name: 'draw',
  data () {
    return {
      listTree: [
        {
          title: '冠军名单',
          data: sourceData1.list
        },
        {
          title: '亚军名单',
          data: sourceData2.list
        }
      ],
      targetSourceData1: [], // 冠军
      targetSourceData2: [], // 亚军
      targetSourceData3: [], // 获奖名单
      current: null, // 当前元素
      currentActive: {
        a: false,
        b: false,
        c: false
      }
    };
  },
  methods: {
    handleDragStart (item) {
      console.log('dragstart...');
      this.current = item;
    },
    handleDragEnd () {
      console.log('dragEnd...');
      this.current = null;
    },
    handleDragOver (e) {
      console.log('drag0ver...');
      // 阻止回弹
      e.preventDefault();
    },
    messageWarn () {
      this.$message.warning(`${this.current.name}已经存在，不允许重复添加啦`);
    },
    handleDrag (e) {
      const type = e.target.dataset.type;
      console.log(type);
      console.log(this.current);
      console.log('释放了');
      if (this.current.type === type) {
        if (type === 'a') {
          if (
            this.targetSourceData1.findIndex(v => v.id === this.current.id) ===
            -1
          ) {
            // 如果已经添加，就不允许重复添加
            this.targetSourceData1.push(this.current);
          } else {
            this.targetSourceData1.length > 0 && this.messageWarn();
          }
        }
        // 如果已经添加，就不允许重复添加
        if (type === 'b') {
          if (
            this.targetSourceData2.findIndex(v => v.id === this.current.id) ===
            -1
          ) {
            this.targetSourceData2.push(this.current);
          } else {
            this.targetSourceData2.length > 0 && this.messageWarn();
          }
        }
      } else {
        if (
          this.targetSourceData3.findIndex(v => v.id === this.current.id) ===
            -1 &&
          type === 'c'
        ) {
          this.targetSourceData3.push(this.current);
        } else {
          if (this.current.type === 'b') {
            this.$message.warning(`拖入区域有误，请拖入亚军区域中`);
          } else if (this.current.type === 'a') {
            this.$message.warning(`拖入区域有误，请拖入冠军区域中`);
          }
          this.targetSourceData3.length > 0 && this.messageWarn();
        }
      }
      this.currentActive[e.target.dataset.type] = false;
    },
    handleLeave (e) {
      console.log('从目标区域，离开了');
      this.currentActive[e.target.dataset.type] = false;
    },
    handleDragEnter (e) {
      console.log('进入目标区域了');
      this.currentActive[e.target.dataset.type] = true;
    },
    handleClear () {
      ['targetSourceData3', 'targetSourceData2', 'targetSourceData1'].forEach(
        key => {
          this[key] = [];
        }
      );
    }
  }
};
</script>

<style>
.drap {
  display: flex;
  justify-content: flex-start;
}
.drap .left,
.drap .right {
  width: 300px;
  border: 1px solid #e5e5e5;
  margin: 0 5px;
}

.content span {
  display: inline-block;
  width: 100px;
  height: 30px;
  border: 1px solid red;
  line-height: 30px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
}
.content-1,
.content-2,
.content-3 {
  width: 250px;
  height: 200px;
  border: 1px solid green;
  margin: 5px auto;
}
.content-1-border,
.content-2-border,
.content-3-border {
  border: 2px dashed green;
}
.title-bar {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
