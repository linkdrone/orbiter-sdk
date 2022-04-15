<template>
  <div class="home">
    <p>
      <button @click="onTransferZksync">TransferZksync</button>
    </p>
    <p>
      <button @click="onTransferImmutablex">TransferImmutablex</button>
    </p>
    <p>
      <button @click="onTransferEthereum">TransferEthereum</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ethers, providers } from 'ethers'
import { utils } from '../../../../src/orbiter-sdk'
import {
  TransactionZksync,
  TransactionImmutablex,
  TransactionEvm,
} from '../../../../src/transaction'

const ethereum = (window as any).ethereum

const ethAmount = ethers.BigNumber.from(10).pow(16)
const usdcAmount = ethers.BigNumber.from(10).pow(6)

const onTransferZksync = async () => {
  const provider = new providers.Web3Provider(ethereum)
  const transactionZksync = new TransactionZksync(33, provider.getSigner())
  const tr = await transactionZksync.transfer({
    amount: usdcAmount,
    tokenAddress: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('transactionZksync >>> ', tr)
}

const onTransferImmutablex = async () => {
  const provider = new providers.Web3Provider(ethereum)

  const transactionImmutablex = new TransactionImmutablex(88, provider.getSigner())
  const tr = await transactionImmutablex.transfer({
    amount: ethAmount,
    tokenAddress: '0x0000000000000000000000000000000000000000',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
    decimals: 18,
  })
  console.warn('transactionImmutablex >>> ', tr)
}

const onTransferEthereum = async () => {
  const chainId = 5
  await utils.ensureMetamaskNetwork(chainId, ethereum)

  const provider = new providers.Web3Provider(ethereum)

  const transactionEvm = new TransactionEvm(chainId, provider.getSigner())
  const tr = await transactionEvm.transfer({
    amount: ethAmount,
    tokenAddress: '0x0000000000000000000000000000000000000000',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('transactionEvm >>> ', tr)
}
</script>
