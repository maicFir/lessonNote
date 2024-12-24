/**
 * @description 请添加组件描述
 * @author maicFir
 */

import React from "react";

const getData = async () => {
  return Promise.resolve("hello server component");
};

async function PageIndex() {
  console.log("server render");
  const data = await getData();

  return (
    <div>
      {data}
      <div>
        <div>123</div>
      </div>
    </div>
  );
}

export default PageIndex;
