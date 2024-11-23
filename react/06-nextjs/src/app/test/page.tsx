/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useState } from "react";

type Props = object;

const Page: React.FC<Props> = (props) => {
  const {} = props;
  const [dataSource] = useState([{ name: "maic" }, { name: "Tom" }]);

  return (
    <div>
      {dataSource.map((v) => {
        return <div key={v.name}>{v.name}</div>;
      })}
    </div>
  );
};

export default memo(Page);
