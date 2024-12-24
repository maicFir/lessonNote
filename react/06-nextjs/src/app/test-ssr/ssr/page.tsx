/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description 请添加组件描述
 * @author maicFir
 */

import React from "react";
import dynamic from "next/dynamic";
import Client from "./client";

// import Server from "./server";

const Server = dynamic(() => import("./server"), {
  loading: () => <p>Loading...</p>,
});

const getData = async () => {
  const res = await fetch(
    "https://bubbleai.xyz/api/v1/info/all_symbol?limit=300"
  );
  const data = await res.json();
  console.log(data.data);
  return data.data;
};

async function Page() {
  const data = await getData();
  return (
    <main>
      <Client />
      <Server />

      {data.map((v: any, index: number) => (
        <div key={index}>{v.symbol}</div>
      ))}
    </main>
  );
}

export default Page;
