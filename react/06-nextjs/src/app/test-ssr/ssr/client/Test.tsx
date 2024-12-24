/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo } from "react";
import styled from "styled-components";
type Props = object;

const Button = styled.button`
  color: red;
`;
const Test: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div>
      test
      <Button>我是一个按钮</Button>
    </div>
  );
};

export default memo(Test);
