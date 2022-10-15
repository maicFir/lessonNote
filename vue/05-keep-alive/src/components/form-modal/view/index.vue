<template>
  <div class="form-modal">
    <el-dialog :visible.sync="currentVisible" v-bind="$attrs" v-on="$listeners">
      <el-form v-bind="formConfig.formAttrs" :model="formParams">
        <div v-for="(item, index) in formConfig.fields" :key="index">
          <el-form-item :label="item.label">
            <!--自定义render-->
            <template v-if="item.render">
              <component
                :is="'renderComponent'"
                :value="formParams[item.key]"
                v-bind="{ ...item }"
              ></component>
            </template>
            <!--自定义插槽-->
            <template v-else-if="item.slot">
              <slot :name="item.slot" :row="{ ...item, formParams, index }" />
            </template>
            <!--文本or文本域-->
            <template v-else-if="['text', 'textarea'].includes(item.type)">
              <el-input
                :type="item.type"
                v-bind="item.attrs || {}"
                v-model="formParams[item.key]"
              ></el-input>
            </template>
            <!--下拉框-->
            <template v-else-if="item.type === 'select'">
              <el-select v-bind="item.attrs" v-model="formParams[item.key]">
                <el-option
                  v-for="(sitem, index) in item.options.data"
                  :key="index"
                  :label="sitem[item.options.extraProps.label]"
                  :value="sitem[item.options.extraProps.value]"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import renderComponent from './render';

export default {
  name: 'form-modal',
  model: {
    prop: 'formParams',
    event: 'change',
  },
  components: {
    renderComponent,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    formParams: {
      type: Object,
    },
    formConfig: {
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
