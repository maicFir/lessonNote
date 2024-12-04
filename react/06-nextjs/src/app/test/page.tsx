/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useState } from "react";
import dynamic from "next/dynamic";

type Props = object;

const Component = (props: {
  children: (count: number, handle: () => void) => React.ReactNode;
}) => {
  const {} = props;
  const [ncount, setNcount] = useState(0);
  return (
    <div>
      {props.children(ncount, () => {
        setNcount(ncount + 1);
      })}
    </div>
  );
};
// import Image from "./Image";
// const Image = React.lazy(() => import("./Image"));
const Image = dynamic(() => import("./Image"));

const Page: React.FC<Props> = (props) => {
  const {} = props;
  const [dataSource] = useState([{ name: "maic" }, { name: "Tom" }]);

  return (
    <div>
      {dataSource.map((v) => {
        return <div key={v.name}>{v.name}</div>;
      })}
      <Component>
        {(count, handle) => {
          return <div onClick={handle}>{count}</div>;
        }}
      </Component>
      <Image />
    </div>
  );
};

export default memo(Page);
