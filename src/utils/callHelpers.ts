import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { ethers } from 'ethers'
import { getAddress } from 'utils/addressHelpers'
import pools from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import { BIG_TEN } from './bigNumber'
import { multicallv2 } from './multicall'
import { web3WithArchivedNodeProvider } from './web3'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const approve = async (lpContract, masterChefContract) => {
  const tx = await lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256)
  return tx.wait()
}

export const stake = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.enterStaking(value, options)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, value, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const sousStake = async (sousChefContract, amount, decimals = 18) => {
  const tx = await sousChefContract.deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), options)
  const receipt = await tx.wait()
  return receipt.status
}

export const sousStakeBnb = async (sousChefContract, amount) => {
  const tx = await sousChefContract.deposit({
    ...options,
    value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
  })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstake = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking(value, options)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.withdraw(pid, value, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const sousUnstake = async (sousChefContract, amount, decimals) => {
  const tx = await sousChefContract.withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
  const receipt = await tx.wait()
  return receipt.status
}

export const sousEmergencyUnstake = async (sousChefContract) => {
  const tx = await sousChefContract.emergencyWithdraw()
  const receipt = await tx.wait()
  return receipt.status
}

export const harvest = async (masterChefContract, pid) => {
  if (pid === 0) {
    const tx = await await masterChefContract.leaveStaking('0', options)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, '0', options)
  const receipt = await tx.wait()
  return receipt.status
}

export const soushHarvest = async (sousChefContract) => {
  const tx = await sousChefContract.deposit('0', options)
  const receipt = await tx.wait()
  return receipt.status
}

export const getActivePools = async (block?: number) => {
  const archivedWeb3 = web3WithArchivedNodeProvider
  const eligiblePools = pools
    .filter((pool) => pool.sousId !== 0)
    .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)
  const blockNumber = block || (await archivedWeb3.eth.getBlockNumber())
  const multiCallOptions = {
    web3: archivedWeb3,
    requireSuccess: false,
    blockNumber,
  }

  const startBlocks = (await multicallv2(
    sousChefABI,
    eligiblePools.map(({ contractAddress }) => {
      return {
        address: getAddress(contractAddress),
        name: 'startBlock',
      }
    }),
    multiCallOptions,
  )) as MultiCallV2Result<BigNumber>[]
  const endBlocks = (await multicallv2(
    sousChefABI,
    eligiblePools.map(({ contractAddress }) => {
      return {
        address: getAddress(contractAddress),
        name: 'bonusEndBlock',
      }
    }),
    multiCallOptions,
  )) as MultiCallV2Result<BigNumber>[]

  return eligiblePools.reduce((accum, pool, index) => {
    const { data: startBlockData } = startBlocks[index]
    const { data: endBlockData } = endBlocks[index]
    const startBlock = new BigNumber(startBlockData[0]._hex)
    const endBlock = new BigNumber(endBlockData[0]._hex)

    if (startBlock.gt(blockNumber) || endBlock.lt(blockNumber)) {
      return accum
    }

    return [...accum, pool]
  }, [])
}
