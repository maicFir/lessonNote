/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";

type Props = object;

const Image: React.FC<Props> = (props) => {
  const {} = props;
  return <div>Hello Image</div>;
};

export default memo(Image);
