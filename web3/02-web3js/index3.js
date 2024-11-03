import { Web3 } from "web3";

const web3 = new Web3("http://127.0.0.1:8545/");

async function txEIP1559() {
  const wallet = web3.eth.wallet.add(
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
  );

  const sender = wallet[0].address;
  const recipient = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
  const value = 1;
  const nonce = await web3.eth.getTransactionCount(sender);
  const gasLimit = 21000;
  const maxFeePerGas = Number((await web3.eth.calculateFeeData()).maxFeePerGas);
  const maxPriorityFeePerGas = Number(
    (await web3.eth.calculateFeeData()).maxPriorityFeePerGas
  );

  debugger;

  console.log("before");
  const senderBinance0 = await web3.eth.getBalance(sender);
  const recipientBinance1 = await web3.eth.getBalance(recipient);
  console.log(senderBinance0);
  console.log(recipientBinance1);
  const tx = {
    from: sender,
    to: recipient,
    value,
    nonce,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    type: 2,
  };

  const txReceipt = await web3.eth.sendTransaction(tx);

  const senderBinance = await web3.eth.getBalance(sender);
  const recipientBinance = await web3.eth.getBalance(recipient);
  console.log("after");
  console.log(senderBinance);
  console.log(recipientBinance);
  debugger;
  console.log("Tx hash", txReceipt.transactionHash);
}

txEIP1559();
