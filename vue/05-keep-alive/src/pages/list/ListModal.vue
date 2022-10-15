<template>
  <el-dialog
    :visible.sync="currentVisible"
    width="30%"
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ $attrs }}
    <el-form label-position="left" label-width="80px" :model="formParams">
      <el-form-item label="日期">
        <el-input v-model="formParams.date"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formParams.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formParams.address"></el-input>
      </el-form-item>
    </el-form>
    <template v-if="$slots.footer">
      <slot name="footer" />
    </template>
    <span v-else slot="footer" class="dialog-footer">
      <el-button @click="closeModal">取 消</el-button>
      <el-button type="primary" @click="handleSure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'list-modal',
  model: {
    prop: 'formParams',
    event: 'change',
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    formParams: {
      type: Object,
    },
  },
  data() {
    return {
      currentVisible: false,
    };
  },
  watch: {
    visible(bool) {
      this.currentVisible = bool;
    },
    currentVisible(bool) {
      this.$emit('update:visible', bool);
    },
  },
  methods: {
    handleSure() {
      console.log(this.formParams);
      this.closeModal();
      this.$emit('refresh');
    },
    closeModal() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style scoped></style>
