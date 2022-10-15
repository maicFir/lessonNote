/* eslint-disable no-param-reassign */
export default {
  functional: true,
  props: ['value'],
  render(h, ctx) {
    // console.log(this, '---'); // 会是null，只能通过第二个参数ctx拿对应参数
    const { formater, attrs, input: handleInput } = ctx.data.attrs;
    return formater(h, {
      attrs: {
        ...attrs,
        value: ctx.props.value,
      },
      on: {
        input(e) {
          handleInput(e);
        },
      },
    });
  },
};
