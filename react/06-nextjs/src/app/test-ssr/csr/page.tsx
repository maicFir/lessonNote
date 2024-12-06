/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useState } from "react";

type Props = object;

const Page: React.FC<Props> = (props) => {
  const {} = props;
  const [msg] = useState("CSR");
  return <div>{msg}</div>;
};

export default memo(Page);
