import React, { memo, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
// import { MetaMaskButton } from "@metamask/sdk-react-ui";
type Props = object;

const Index: React.FC<Props> = (props) => {
  const [address, setAddress] = useState("");
  const { sdk, connected, connecting, provider, chainId, account, balance } =
    useSDK();
  const handleConnect = async () => {
    try {
      const account = await sdk?.connect();
      setAddress(account[0]);
      console.log(account);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };
  // sdk?.options.openDeeplink()
  const handleAddChain = () => {
    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: { symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
          },
        ],
      })
      .then((res) => console.log("add", res))
      .catch((e) => console.log("ADD ERR", e));

    console.log(account);
  };
  const handleDappLink = () => {
    const mobileUri =
      "https://metamask.app.link/wc?uri=http://192.168.31.122:5173/";
    const link = document.createElement("a");
    link.href = mobileUri;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.click();
    // setTimeout(() => {
    //   sdk?.options.openDeeplink(
    //     "https://metamask.app.link/wc?uri=wc%3A91a3d915655d6be5f7791f1668b724676bbe8e22cdb5cbdb20612a75962f6930%402%3FexpiryTimestamp%3D1730735928%26relay-protocol%3Dirn%26symKey%3Dec311bccad426a5b5ecc5cba29364c8a7c2f3dbbb705d5e9c45d81f256035808"
    //   );
    // }, 1000);
  };
  return (
    <>
      <div onClick={handleConnect}>Connect wallet</div>
      <div className="open-link" onClick={handleDappLink}>
        open link
      </div>
      <div>address: {address}</div>
      <div className="addChain" onClick={handleAddChain}></div>
      <hr />
      <p>{`Connected: ${connected}`}</p>
      {connecting && <div>Waiting for Metamask to link the connection...</div>}
      <p>chainId:{chainId}</p>
      <p>balance: {balance}</p>

      <hr />
      {/* <MetaMaskButton theme={"light"} color="white" /> */}
    </>
  );
};

export default memo(Index);
