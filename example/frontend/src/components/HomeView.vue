<template>
  <div class="home">
    <el-select v-model="state.tokenAddress" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in state.tokens"
        :key="item.tokenAddress"
        :label="item.tokenName"
        :value="item.tokenAddress"
      />
    </el-select>
    <el-select v-model="state.fromChainId" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in state.fromChains"
        :key="item.chainId"
        :label="item.chainName"
        :value="item.chainId"
      />
    </el-select>
    <el-select v-model="state.toChainId" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in state.toChains"
        :key="item.chainId"
        :label="item.chainName"
        :value="item.chainId"
      />
    </el-select>
    <br /><br />
    <el-input
      size="large"
      v-model="state.amount"
      placeholder="Please input amount."
      style="width: 300px"
    />
    <br />
    <el-button size="large" type="primary" @click="onConfirmTransfer">Confirm Transfer</el-button>

    <!-- <br />
    <el-button size="default" @click="onTransferZksync">TransferZksync</el-button>
    <el-button size="default" @click="onTransferImmutablex">TransferImmutablex</el-button>
    <el-button size="default" @click="onTransferEthereum">TransferEthereum</el-button>
    <el-button size="default" @click="onTransferEthereumUsdc">TransferEthereumUsdc</el-button>
    <br />
    <el-button size="default" @click="onTransferPolygon">TransferPolygon</el-button>
    <el-button size="default" @click="onTransferArbitum">TransferArbitum</el-button>
    <el-button size="default" @click="onTransferLoopring">TransferLoopring</el-button>
    <el-button size="default" @click="onTransferDydx">TransferDydx</el-button> -->
  </div>
</template>

<script lang="ts">
import { ethers, providers } from 'ethers'
import { reactive } from 'vue'
import Web3 from 'web3'
import { utils, Bridge } from '../../../../src/orbiter-sdk'
import {
  TransactionDydx,
  TransactionEvm,
  TransactionImmutablex,
  TransactionLoopring,
  TransactionZksync,
} from '../../../../src/transaction'
</script>

<script setup lang="ts">
const state = reactive({
  tokenAddress: '0x0000000000000000000000000000000000000000',
  tokens: [
    {
      tokenAddress: '0x0000000000000000000000000000000000000000',
      tokenName: 'ETH',
    },
    {
      tokenAddress: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
      tokenName: 'USDC',
    },
  ],

  fromChainId: 5,
  fromChains: [
    {
      chainId: 5,
      chainName: 'Ethereum(R)',
    },
    {
      chainId: 22,
      chainName: 'Arbitum',
    },
  ],

  toChainId: 22,
  toChains: [
    {
      chainId: 22,
      chainName: 'Arbitum',
    },
  ],

  amount: '',
})

const ethereum = (window as any).ethereum

const ethAmount = ethers.BigNumber.from(10).pow(16)
const usdcAmount = ethers.BigNumber.from(10).pow(6)

const onConfirmTransfer = async () => {
  const bridge = new Bridge('Testnet')
  console.warn('bridge.makerList >>> ', await bridge.getMakerList());
  

  const chainId = 5
  await utils.ensureMetamaskNetwork(chainId, ethereum)

  const provider = new providers.Web3Provider(ethereum)

  const transactionEvm = new TransactionEvm(chainId, provider.getSigner())
  // const tr = await transactionEvm.transfer({
  //   amount: ethers.utils.parseUnits(state.amount, 18),
  //   tokenAddress: '0x0000000000000000000000000000000000000000',
  //   toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  // })
  const tr = await transactionEvm.transfer({
    amount: ethers.utils.parseUnits(state.amount, 6),
    tokenAddress: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('onConfirmTransfer >>> ', tr)
}

const onTransferZksync = async () => {
  const provider = new providers.Web3Provider(ethereum)
  const transactionZksync = new TransactionZksync(33, provider.getSigner())
  const tr = await transactionZksync.transfer({
    amount: usdcAmount,
    tokenAddress: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('onTransferZksync >>> ', tr)
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
  console.warn('onTransferImmutablex >>> ', tr)
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
  console.warn('onTransferEthereum >>> ', tr)
}

const onTransferPolygon = async () => {
  const chainId = 66
  await utils.ensureMetamaskNetwork(chainId, ethereum)

  const provider = new providers.Web3Provider(ethereum)

  const transactionEvm = new TransactionEvm(chainId, provider.getSigner())
  const tr = await transactionEvm.transfer({
    amount: ethAmount,
    tokenAddress: '0x0000000000000000000000000000000000000000',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('onTransferPolygon >>> ', tr)
}

const onTransferArbitum = async () => {
  const chainId = 22
  await utils.ensureMetamaskNetwork(chainId, ethereum)

  const provider = new providers.Web3Provider(ethereum)

  const transactionEvm = new TransactionEvm(chainId, provider.getSigner())
  const tr = await transactionEvm.transfer({
    amount: ethAmount,
    tokenAddress: '0x0000000000000000000000000000000000000000',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('onTransferArbitum >>> ', tr)
}

const onTransferEthereumUsdc = async () => {
  const chainId = 5
  await utils.ensureMetamaskNetwork(chainId, ethereum)

  const provider = new providers.Web3Provider(ethereum)

  const transactionEvm = new TransactionEvm(chainId, provider.getSigner())
  const tr = await transactionEvm.transfer({
    amount: usdcAmount,
    tokenAddress: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('onTransferEthereumUsdc >>> ', tr)
}

const onTransferLoopring = async () => {
  const chainId = 99
  const web3 = new Web3(ethereum)

  const transactionEvm = new TransactionLoopring(chainId, web3)
  const tr = await transactionEvm.transfer({
    amount: ethAmount,
    fromAddress: await web3.eth.getCoinbase(),
    tokenAddress: '0x0000000000000000000000000000000000000000',
    toAddress: '0xF2BE509057855b055f0515CCD0223BEf84D19ad4',
  })
  console.warn('onTransferLoopring >>> ', tr)
}

const onTransferDydx = async () => {
  const chainId = 511
  await utils.ensureMetamaskNetwork(chainId, ethereum)
  const web3 = new Web3(ethereum)
  const transactionEvm = new TransactionDydx(chainId, web3)
  const tr = await transactionEvm.transfer({
    amount: usdcAmount,
    fromAddress: await web3.eth.getCoinbase(),
    tokenAddress: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
    toAddress: '0x694434EC84b7A8Ad8eFc57327ddD0A428e23f8D5',
    receiverPublicKey: '04e69175389829db733f41ae75e7ba59ea2b2849690c734fcd291c94d6ec6017',
    receiverPositionId: '60620',
  })
  console.warn('onTransferDydx >>> ', tr)
}
</script>

<style>
.el-select {
  margin-right: 12px;
}
.el-button {
  margin-top: 12px;
}
</style>
