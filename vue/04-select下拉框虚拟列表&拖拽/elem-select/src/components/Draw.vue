<template>
  <div class="drap">
    <div class="left">
      <h3>原始区域{{ $route.fullPath }}</h3>
      <div class="content">
        <div>
          <p>source1</p>
          <span
            v-for="(item, index) in sourceData"
            :key="index"
            draggable="true"
            :data-type="item.type"
            :data-id="item.id"
            @dragstart="dragstart($event, item)"
            @dragend="dragEnd($event, item)"
            >{{ item.text }}</span
          >
        </div>
        <div>
          <p>source2</p>
          <span
            v-for="(item, index) in sourceData2"
            :key="index"
            :data-id="item.id"
            :data-type="item.type"
            draggable="true"
            @dragstart="dragstart($event, item)"
            @dragend="dragEnd($event, item)"
            >{{ item.text }}</span
          >
        </div>
      </div>
    </div>
    <div class="right">
      <h3>目标区域</h3>
      <div
        :class="[
          'content content-1',
          currentActive.a ? 'content-1-border' : ''
        ]"
        data-type="a"
        @dragenter="handleDragEnter"
        @dragover.prevent="() => {}"
        @dragleave="handleLeave"
      >
        <p>source1</p>
        <span
          draggable="true"
          v-for="(item, index) in newsourceData1"
          :key="index"
          :data-index="index"
          :data-type="item.type"
          @dragstart="dragstart2($event)"
          @drap="handleDrap"
          @dragover.prevent="() => {}"
          >{{ item.text }}</span
        >
      </div>
      <div
        :class="[
          'content content-2',
          currentActive.b ? 'content-2-border' : ''
        ]"
        data-type="b"
        @dragenter="handleDragEnter"
        @dragleave="handleLeave"
      >
        <p>source2</p>
        <span
          draggable="true"
          v-for="(item, index) in newSourceData2"
          :key="index"
          :data-type="item.type"
          :data-index="index"
          >{{ item.text }}</span
        >
      </div>
      <div
        :class="[
          'content content-3',
          currentActive.c ? 'content-3-border' : ''
        ]"
        data-type="c"
        @dragenter="handleDragEnter"
        @dragleave="handleLeave"
      >
        <p>source1,source2</p>
        <span
          v-for="(item, index) in newSourceData3"
          :key="index"
          draggable="true"
          :data-index="index"
          >{{ item.text }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'draw',
  data () {
    return {
      ids: [],
      ids2: [],
      sourceData: [
        {
          id: 1,
          text: '1',
          type: 'a'
        },
        {
          id: 2,
          text: '2',
          type: 'a'
        },
        {
          id: 3,
          text: '3',
          type: 'a'
        },
        {
          id: 4,
          text: '4',
          type: 'a'
        },
        {
          id: 5,
          text: '5',
          type: 'a'
        }
      ],
      sourceData2: [
        {
          id: 6,
          text: '6',
          type: 'b'
        },
        {
          id: 7,
          text: '7',
          type: 'b'
        },
        {
          id: 8,
          text: '8',
          type: 'b'
        },
        {
          id: 9,
          text: '9',
          type: 'b'
        },
        {
          id: 10,
          text: '10',
          type: 'b'
        }
      ],
      newsourceData1: [],
      newSourceData2: [],
      newSourceData3: [],
      current: {
        id: '',
        type: ''
      },
      curentIndex: 0,
      target: {},
      currentActive: {
        a: false,
        b: false,
        c: false
      }
    };
  },
  methods: {
    dragstart2 (e) {
      this.curentIndex = e.target.dataset.index;
    },
    dragstart (e, item) {
      this.current = {
        type: item.type,
        id: item.id
      };
    },
    handledrag () {
      console.log('拖动时触发drap');
    },
    handleDrap () {
      console.log('释放了');
    },
    handleLeave (e) {
      console.log('离开了');
      this.currentActive[e.target.dataset.type] = false;
    },
    dragEnd (e, item) {
      console.log('拖拽结束了');
      console.log(e.target);
      Object.keys(this.currentActive).forEach(key => {
        this.currentActive[key] = false;
      });
      this.drawCopy();
    },
    drawCopy () {
      const { id } = this.current;
      const { sourceData, sourceData2 } = this;
      const { type } = this.target;
      let currentData = {};
      if (this.ids.includes(id) && ['a', 'b'].includes(type)) {
        return;
      }
      if (this.ids2.includes(id) && type === 'c') {
        return;
      }
      if (this.current.type === 'a') {
        currentData = sourceData.find(v => v.id === id);
      } else {
        currentData = sourceData2.find(v => v.id === id);
      }
      if (type === 'a' && type === this.current.type) {
        this.ids.push(id);
        this.newsourceData1.push(currentData);
      }
      if (type === 'b' && type === this.current.type) {
        this.ids.push(id);
        this.newSourceData2.push(currentData);
      }
      if (type === 'c') {
        this.ids2.push(id);
        this.newSourceData3.push(currentData);
      }
    },
    handleDragEnter (e) {
      console.log('触发了');
      this.target = e.target.dataset;
      this.currentActive[e.target.dataset.type] = true;
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
  height: 800px;
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
</style>
