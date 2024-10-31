
import  {memo, useRef, useState} from "react";
import {createPublicClient, http, createWalletClient, custom, isAddress, parseEther, formatUnits } from "viem"

import { mainnet } from "viem/chains";


const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })
  console.log(client);
  const getBlock = async () => {
    const blockNumber = await client.getBlockNumber();
    console.log(blockNumber);
}
getBlock();





const Index = () => {
  const [address, setIsAddress] = useState("");
  const [isEthAddress, setIsEthAddress] = useState(false);
  const accountRef = useRef(null);
  const currentHash = useRef(null);
  const wallect = useRef(null);
  const handleSignMessage = async () => {

    const walletClient = createWalletClient({
        account: accountRef.current,
        chain: mainnet,
        transport:custom(window.ethereum),
    });
    wallect.current = walletClient;
    
    const hash = await wallect.current.signMessage({
        message: "hello world"
    });
    currentHash.current = hash;
    console.log(hash);
  
  }
  const handleConnetWallet = async () => {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(account, '==account')
    accountRef.current = account;
  }
  const handleDiscontent = async () => {
    const res = await wallect.current.requestPermissions({ eth_accounts: {} });
    console.log(res);
  }
  const handleVerifyMessage = async () => {
    console.log(accountRef.current);
    console.log(currentHash.current);
    try {
        const isViild = await client.verifyMessage({
            message: "hello world",
            signature: currentHash.current,
            signer: accountRef.current,
        }); 
        console.log(isViild);
    } catch (error) {
   
        console.log(error);
    }
   

  };
  const handleVerifyAddress = () => {
    const isEthAddress = isAddress(address);
    setIsEthAddress(isEthAddress);
  }
  const handleSendTransaction = async () => {
    const res = await wallect.current.sendTransaction({
        to: "0x5A39756bAE97685917a292B33ddFb2B54DF1e806",
        value: parseEther("1"), // 1 ETH
    });
    console.log(res);
  }

  const handleGetBlance = async () => {
    console.log( accountRef.current)
    const res =  await client.getBalance({
        address:  accountRef.current,
    });
    console.log(`余额:${formatUnits(res, 18)} BNB`);
  }
  const handleGetTranstion = async () => {
    const res = await client.getTransactionReceipt({
        hash: "0xf6914af778b18ca1be98adead61af6351862fe26faad7e64d631df30fe925cd4"
    });
    console.log(res);
  }
  return <div>
    <h1 onClick={handleConnetWallet}>Content Wallet</h1>
    <h1 onClick={handleDiscontent}>Discontent</h1>
    <h1 onClick={handleSignMessage}>SignMessage</h1>
    <h1 onClick={handleSendTransaction}>sendTransaction</h1>
    <h1 onClick={handleGetBlance}>get Blance</h1>
    <h1 onClick={handleGetTranstion}>get transition hash</h1>
    <h1 onClick={handleVerifyMessage}>Verify Message</h1>

    <div>
        <input type="text" onChange={(e) => setIsAddress(e.target.value)} />
        <button onClick={handleVerifyAddress}>Verify address</button>
    </div>
    <h1>{address} {isEthAddress ? 'is': 'is not'} EthAddress</h1>
  </div>;
};

export default memo(Index);
