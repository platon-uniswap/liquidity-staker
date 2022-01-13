const { ethers } = require("hardhat");


async function main() {
    const [signer0] = await ethers.getSigners()
    const deployer = signer0.address
    console.log('deployer address', deployer)
    const StakingRewardsFactoryContract = await ethers.getContractFactory('StakingRewardsFactory')
    const factoryAddress = '0x60ce7a5043965Be14aD6864F6b8F445B6119b818'
    const factory = await StakingRewardsFactoryContract.attach(factoryAddress)

    console.log('deploy')
    const stakingToken = '0xbf23f27113e3f01d5160d787554fb4244f311461' // WETHUSDT
    const rewardAmount = ethers.utils.parseEther('1000000')
    const stakingRewardsGenesis = await factory.stakingRewardsGenesis()
    console.log('stakingRewardsGenesis', stakingRewardsGenesis)
    await factory.deploy(stakingToken, rewardAmount)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});