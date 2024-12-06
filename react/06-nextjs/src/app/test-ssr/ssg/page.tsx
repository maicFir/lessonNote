/**
 * @description 请添加组件描述
 * @author maicFir
 */

import React, { memo } from "react";

type Props = {
  msg: string;
};
// export const revalidate = 2;

const getData = async () => {
  return "Hello";
};
const Page: React.FC<Props> = async (props) => {
  const { msg = "hello" } = props;
  const data = await getData();
  return (
    <div>
      {msg}, {data}
    </div>
  );
};

export default memo(Page);
