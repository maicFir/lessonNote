
export default {
  props: ['value'],
  render(h) {
    const self = this;
    const { formater, attrs } = this.$attrs;
    return formater(h, {
      domProps: { value: self.value },
      attrs,
      on: {
        input(event) {
          self.$emit('input', event.target.value);
        },
      },
    });
  },
};
