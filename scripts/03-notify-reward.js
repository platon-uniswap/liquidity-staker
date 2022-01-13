const { ethers } = require("hardhat");


async function main() {
    const [signer0] = await ethers.getSigners()
    const deployer = signer0.address
    console.log('deployer address', deployer)
    const StakingRewardsFactoryContract = await ethers.getContractFactory('StakingRewardsFactory')
    const factoryAddress = '0x60ce7a5043965Be14aD6864F6b8F445B6119b818'
    const factory = await StakingRewardsFactoryContract.attach(factoryAddress)
    const owner = await factory.owner()
    console.log('owner', owner)
    const stakeToken = await factory.stakingTokens(0)
    const si = await factory.stakingRewardsInfoByStakingToken(stakeToken)
    console.log('staking rewards address', si.stakingRewards)

    const rewardsTokenAddr = await factory.rewardsToken()
    const TestERC20Contract = await ethers.getContractFactory('TestERC20')
    const rewardsToken = await TestERC20Contract.attach(rewardsTokenAddr)
    console.log('transfer reward', si.rewardAmount.toString())
    await rewardsToken.transfer(factory.address, si.rewardAmount)
    console.log('transfered')

    console.log('notify')
    await factory.notifyRewardAmounts()
    console.log('done')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
