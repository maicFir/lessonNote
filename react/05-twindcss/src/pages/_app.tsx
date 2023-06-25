/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import RootLayout from "@/app/layout";

const _app: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
};

export default _app;
