const { ethers } = require("hardhat");


async function main() {
    const [signer0] = await ethers.getSigners()
    const deployer = signer0.address
    console.log('deployer address', deployer)
    const StakingRewardsFactoryContract = await ethers.getContractFactory('StakingRewardsFactory')
    const now = Math.floor(new Date().getTime()) + 60 * 1000 // 1 minutes
    const _rewardsToken = '0xDFA36286675c8a03050b63F23D79786A067E0d24'
    const factory = await StakingRewardsFactoryContract.deploy(_rewardsToken, now)
    console.log('staking reward factory address,', factory.address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});