import { Web3 } from "web3";
// https://mainnet.infura.io/v3/5920517516ba405d8b898b80f8bc4243
// https://eth.llamarpc.com
const web3 = new Web3("https://eth.llamarpc.com");

const app = document.getElementById("app").querySelector(".content");
let html = "";
console.log("web3 start");
const getBlockNumber = async () => {
  const blockNum = await web3.eth.getBlockNumber();
  console.log(`blockNum:`, blockNum);
  html += `blockNum:${blockNum}<br/>`;
};
const getChinId = async () => {
  const chainId = await web3.eth.getChainId();
  console.log(`chainId:`, chainId);
  html += `chainId:${chainId}<br/>`;
};

const getBlance = async () => {
  const res = await web3.eth.getBalance(
    "0x5A39756bAE97685917a292B33ddFb2B54DF1e806"
  );
  html += `blance:${res}<br/>`;
  console.log(`blance:`, res);
};

// https://mainnet.infura.io/v3/5920517516ba405d8b898b80f8bc4243

Promise.all([getBlockNumber(), getChinId(), getBlance()]).then(() => {
  app.innerHTML = html;
});

console.log("222");
