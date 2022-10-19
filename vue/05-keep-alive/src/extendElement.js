/* eslint-disable func-names */
// eslint-disable-next-line import/prefer-default-export

const hightText = (sourceStr, curentVal, reg = 'all') => {
  if (curentVal === '') {
    return sourceStr;
  }
  const ret = sourceStr.match(curentVal);
  const hightStr = Array.isArray(ret) ? ret[0] : '';
  const hightDom = text => `<span class="hight" style='color: red;font-weight:bold'>${text}</span>`;
  //   if (reg) {
  //     // 全匹配
  //     return sourceStr.split(hightStr).reduce((prev, cur) => {
  //       if (cur === '') {
  //         prev.push(`<span class="hight" style="color: red;font-weight:bold">${hightStr}</span>`);
  //       }
  //       if (cur) {
  //         prev.push(cur);
  //       }
  //       return prev;
  //     }, []).join('');
  //   }
  //   return hightStr
  //     ? sourceStr.replace(
  //       hightStr,
  //       `<span class="hight" style="color: red;font-weight:bold">${hightStr}</span>`
  //     )
  //     : `${sourceStr}`;

  if (hightStr) {
    if (reg) {
      // 全匹配
      return sourceStr.replace(new RegExp(`${hightStr}`, 'ig'), hightDom(hightStr));
    }
    return sourceStr.replace(
      hightStr, hightDom(hightStr),
    );
  }
  return sourceStr;
};
// eslint-disable-next-line import/prefer-default-export
export const extendElemenUI = (ElementUI) => {
  const { Option } = ElementUI;
  // 重写elementUI下拉框的Option,让其支持模糊搜索关键字高亮
  // eslint-disable-next-line no-unused-vars
  Option.render = function (h) {
    const { visible, itemSelected, disabled, groupDisabled, limitReached, selectOptionClick, hoverItem, currentLabel, hover, select: { query } } = this;
    const setSlectClass = () => {
      let str = 'el-select-dropdown__item';
      if (itemSelected) {
        str += ' selected';
      }
      if (disabled || groupDisabled || limitReached) {
        str += ' is-disabled';
      }
      if (hover) {
        str += ' hover';
      }
      return str;
    };
    return (visible ? <li
      on-mouseenter={hoverItem}
      on-click={selectOptionClick}
      class={setSlectClass()}
    >
      <slot>
        <span domPropsInnerHTML={hightText(currentLabel, query, 'all')}></span>
      </slot>
    </li > : null);
  };
};

