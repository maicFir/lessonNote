/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React from "react";
import dynamic from "next/dynamic";

const Time = dynamic(() => import("./Time"));

const Page = async () => {
  const data = await fetch(
    "https://bubbleai.xyz/api/v1/bubble/trending_token?start_date=1732284834505"
  );
  const dataData = await data.json();
  console.log(dataData);

  return (
    <div>
      <Time />
      {dataData.data.map((v, index: number) => {
        return <div key={index}>{v.symbol}</div>;
      })}
    </div>
  );
};

export default Page;
