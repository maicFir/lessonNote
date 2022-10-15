
import Vue from 'vue';
import FormModal from './form-modal';

const custCompoment = {
  FormModal,
};
// eslint-disable-next-line import/prefer-default-export
export const installCustComponent = () => {
  Object.keys(custCompoment).forEach((key) => {
    Vue.component(key, custCompoment[key]);
  });
};

