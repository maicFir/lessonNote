import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});
console.log(client);
const getBlock = async () => {
  const blockNumber = await client.getBlockNumber();
  console.log(blockNumber);
};
getBlock();
