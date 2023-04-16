// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const snapShotID = await hre.network.provider.send("evm_snapshot", []);
  console.log(snapShotID);
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();
  const txHash = lock.deployTransaction.hash;
  console.log(txHash);
  const confirmations = (await hre.ethers.provider.getTransactionReceipt(txHash)).confirmations;
  console.log(`confirmations: ${confirmations.toString()}`);

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );

  await hre.network.provider.send("evm_revert", [snapShotID]);
  const lock2 = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock2.deployed();
  const txHash2 = lock2.deployTransaction.hash;
  console.log(txHash2);
  const confirmations2 = (await hre.ethers.provider.getTransactionReceipt(txHash2)).confirmations;
  console.log(`confirmations2: ${confirmations2.toString()}`);

  // async function getBalance(address) {
  //   const balance = await hre.ethers.provider.getBalance(address);
  //   return balance.toString();
  // }

  // const signers = await hre.ethers.getSigners();
  // for await (const signer of signers) {
  //   console.log((signer.address));
  //   console.log(getBalance(signer.address));
  // }

  // await signers[0].sendTransaction({
  //   to: signers[1].address,
  //   value: hre.ethers.utils.parseEther("10"),
  // })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
