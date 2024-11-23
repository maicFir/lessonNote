import { MetaMaskSDK } from "@metamask/sdk";

const metaSdk = new MetaMaskSDK({
  dappMetadata: {
    name: "My Dapp",
    url: window.location.href,
  },
  infuraAPIKey: "5920517516ba405d8b898b80f8bc4243",
});
const provider = metaSdk.getProvider();
function App() {
  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert("请安装 MetaMask 扩展");
    }
    if (!provider) {
      console.log("Provider 未初始化，请等待 MetaMaskSDK 初始化完成。");
      return;
    }
    console.log(provider, "=provider");
    try {
      const res = await provider?.request({
        method: "eth_requestAccounts",
        params: [],
      });
      console.log(res);
    } catch (error) {
      console.log("链接失败", error);
    }
  };
  return (
    <>
      <div onClick={handleConnectWallet}>Connect Wallet</div>
    </>
  );
}

export default App;
