/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useState } from "react";
// import Server from "../server/index";
import Test from "./Test";
type Props = object;

const Index: React.FC<Props> = (props) => {
  const {} = props;
  const [count, setCount] = useState(0);
  const handCount = () => {
    setCount((prev) => {
      console.log("prev", prev);
      return prev + 1;
    });
  };
  return (
    <div>
      <p dir="rtl">Hello</p>
      <p dir="ltr">Hello</p>
      <p>{count}</p>
      <button onClick={handCount}>add</button>
      <Test />
      {/* <Server /> */}
    </div>
  );
};

export default memo(Index);
