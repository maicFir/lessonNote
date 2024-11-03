import { Web3 } from "web3";

let providers = await Web3.requestEIP6963Providers();

console.log(providers);
const app = document.getElementById("app");
const walletList = app.querySelector(".wallet-list");
const wallets = [];
for (const [key, value] of providers) {
  console.log(value, "value");
  wallets.push(value);
  console.log(value.info.name);
  // if (value.info.name === "MetaMask") {
  //   const web3 = new Web3(value.provider);
  //   console.log(web3);
  //   // now you can use web3 object with injected provider
  // }
}
console.log(wallets, "wallets");
wallets.forEach((wallet) => {
  const walletItem = document.createElement("div");
  const icon = document.createElement("img");
  const label = document.createElement("span");
  icon.src = wallet.info.icon;
  icon.style.width = "30px";
  icon.style.height = "30px";
  label.textContent = wallet.info.name;
  walletItem.style.display = "flex";
  walletItem.style.alignItems = "center";
  walletItem.setAttribute("wallet-name", wallet.info.name);
  walletItem.appendChild(icon);
  walletItem.appendChild(label);
  walletList.appendChild(walletItem);

  walletItem.addEventListener("click", async () => {
    if (wallet.info.name === "MetaMask") {
      // 链接钱包
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
    }
    // 链接钱包
    if (wallet.info.name === "OKX Wallet") {
      await window.okxwallet.request({
        method: "eth_requestAccounts",
      });
    }

    // now you can use web3 object with injected provider
  });
});

const initWallet = () => {
  const createBtn = app.querySelector(".create-wallet");
  const signBtn = app.querySelector(".sign");
  const signTrans = app.querySelector(".signTransaction");
  const originAccountDom = app.querySelector(".getOriginAddress");
  const discontentWalletDom = app.querySelector(".discontent-wallet");
  const chainId = app.querySelector(".chainId");
  const chainIdResult = app.querySelector(".chainId-result");
  const transSigin = app.querySelector(".transSigin");
  const web3 = new Web3();
  let account = null;
  console.log(web3.eth.accounts.create());
  createBtn.addEventListener("click", () => {
    account = web3.eth.accounts.create();
    console.log(account);
    createBtn.parentNode.querySelector(".address").innerText = account.address;
    createBtn.parentNode.querySelector(".privateKey").innerText =
      account.privateKey;
  });
  signBtn.addEventListener("click", async () => {
    if (!account) {
      alert("请先创建钱包");
      return;
    }
    console.log(account);
    const message = "Hello, World!";
    const signature = await account.sign(message);
    console.log(signature);
    signBtn.parentNode.querySelector(".signature").innerText =
      signature.messageHash;
  });

  originAccountDom.addEventListener("click", async () => {
    if (!account) {
      alert("请先创建钱包");
      return;
    }
    const resultDom = app.querySelector(".getOriginAddress-result");
    const originAccount = web3.eth.accounts.privateKeyToAccount(
      account.privateKey
    );
    debugger;
    resultDom.innerText = originAccount.address;
  });

  discontentWalletDom.addEventListener("click", async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
  });

  // 转账
  signTrans.addEventListener("click", async () => {
    if (!account) {
      alert("请先创建钱包");
      return;
    }
    const tx = {
      from: account.address,
      to: "0x5A39756bAE97685917a292B33ddFb2B54DF1e806",
      value: web3.utils.toWei("1", "ether"), // 1 ether
    };
    const signedTx = await account.signTransaction(tx);
    console.log(signedTx);
  });

  chainId.addEventListener("click", async () => {
    const web3 = new Web3("http://127.0.0.1:8545/");
    debugger;
    // Log the chain ID to the console
    web3.eth
      .getChainId()
      .then((result) => {
        console.log("Chain ID: " + result);
        chainIdResult.innerText = result;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // transSign
  transSigin.addEventListener("click", async () => {
    try {
      const web3 = new Web3("http://127.0.0.1:8545/");
      // create a new Web3.js account object with the private key of a Hardhat test account
      const privateKey =
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
      // the account is created with a wallet, which makes it easier to use
      const sender = web3.eth.accounts.wallet.add(privateKey)[0];

      // generate a new random Web3.js account object to receive the transaction
      const receiver = web3.eth.accounts.create();
      // log initial balances

      const senderBlance = await web3.eth.getBalance(sender.address);
      const receiverBlance = await web3.eth.getBalance(receiver.address);
      console.log("before");
      console.log(senderBlance, receiverBlance);
      // sign and send the transaction
      const receipt = await web3.eth
        .sendTransaction({
          from: sender.address,
          to: receiver.address,
          // amount in wei
          value: web3.utils.toWei("1", "ether"),
        })
        .on("sending", (sending) => {
          console.log("sending", sending);
        })
        .on("sent", (sent) => {
          console.log("sent", sent);
        })
        .on("transactionHash", (transactionHash) => {
          console.log("transactionHash", transactionHash);
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
        })
        .on("confirmation", (confirmation) => {
          console.log("confirmation", confirmation);
        })
        .on("error", (error) => {
          console.log("error", error);
        });

      const senderBlance2 = await web3.eth.getBalance(sender.address);
      const receiverBlance2 = await web3.eth.getBalance(receiver.address);
      debugger;
      console.log("after");
      console.log(senderBlance2, receiverBlance2);
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  });
};
initWallet();
