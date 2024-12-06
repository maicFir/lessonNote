/**
 * @description 请添加组件描述
 * @author maicFir
 */

import React, { memo } from "react";

const getData = async () => {
  return "SSR";
};

async function Page() {
  const data = await getData();
  return <main>{data}</main>;
}

export default memo(Page);
