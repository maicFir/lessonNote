/**
 * @description 请添加组件描述
 * @author maicFir
 */
"use client";
import React, { memo, useRef, useEffect } from "react";
import { createOkxSwapWidget } from "@okxweb3/dex-widget";
type Props = object;

const Page: React.FC<Props> = (props) => {
  const {} = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetRef = useRef<any>();
  const provider = useRef();
  const initialConfig = {
    params: {
      providerType: "EVM",
    },
    provider: provider.current,
    listeners: [
      {
        event: "ON_CONNECT_WALLET",
        handler: (token, preToken) => {
          provider.current.enable();
        },
      },
    ],
  };

  useEffect(() => {
    provider.current = window.ethereum;
    const widgetHandler = createOkxSwapWidget(widgetRef.current, initialConfig);

    return () => {
      widgetHandler?.destroy();
    };
  }, []);

  return <div ref={widgetRef}></div>;
};

export default memo(Page);
