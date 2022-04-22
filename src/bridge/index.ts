import { Provider } from '@ethersproject/abstract-provider'
import { Web3Provider } from '@ethersproject/providers'
import { ethers, providers, utils } from 'ethers'
import config from '../config'
import { core } from '../orbiter-sdk'
import { TransactionEvm, TransactionImmutablex, TransactionZksync } from '../transaction'
import { TransactionTransferOptions } from '../transaction/transaction'
import { ensureMetamaskNetwork, equalsIgnoreCase } from '../utils'
import { ChainValidator } from '../utils/validator'
import { makerList as makerList_mainnet } from './maker_list.mainnet'
import { makerList as makerList_testnet } from './maker_list.testnet'

export type BridgeToken = {
  chainId: number // The tokens on different chains are different, but the names are the same
  name: string
  address: string
  precision: number
  makerAddress: string
  icon?: string
}
export type BridgeChain = {
  id: number // Orbiter's chainId
  name: string
  networkId: number | string
  icon?: string
}
export type BridgeNetwork = 'Mainnet' | 'Testnet'

export class Bridge {
  private network: BridgeNetwork = 'Testnet'
  private makerList: typeof makerList_mainnet | typeof makerList_testnet

  constructor(network: BridgeNetwork) {
    this.network = network
  }

  /**
   * @param makerListItem
   * @returns
   */
  private expandMakerInfo(
    makerListItem: typeof makerList_mainnet[0] | typeof makerList_testnet[0]
  ) {
    return [
      {
        makerAddress: makerListItem.makerAddress,
        fromChainId: makerListItem.c1ID,
        toChainId: makerListItem.c2ID,
        fromChainName: makerListItem.c1Name,
        toChainName: makerListItem.c2Name,
        fromTokenAddress: makerListItem.t1Address,
        toTokenAddress: makerListItem.t2Address,
        tokenName: makerListItem.tName,
        minPrice: makerListItem.c1MinPrice,
        maxPrice: makerListItem.c1MaxPrice,
        precision: makerListItem.precision,
        avalibleDeposit: makerListItem.c1AvalibleDeposit,
        tradingFee: makerListItem.c1TradingFee,
        gasFee: makerListItem.c1GasFee,
        avalibleTimes: makerListItem.c1AvalibleTimes,
      },
      {
        makerAddress: makerListItem.makerAddress,
        fromChainId: makerListItem.c2ID,
        toChainId: makerListItem.c1ID,
        fromChainName: makerListItem.c2Name,
        toChainName: makerListItem.c1Name,
        fromTokenAddress: makerListItem.t2Address,
        toTokenAddress: makerListItem.t1Address,
        tokenName: makerListItem.tName,
        minPrice: makerListItem.c2MinPrice,
        maxPrice: makerListItem.c2MaxPrice,
        precision: makerListItem.precision,
        avalibleDeposit: makerListItem.c2AvalibleDeposit,
        tradingFee: makerListItem.c2TradingFee,
        gasFee: makerListItem.c2GasFee,
        avalibleTimes: makerListItem.c2AvalibleTimes,
      },
    ]
  }

  /**
   * @returns
   */
  public getNetwork() {
    return this.network
  }

  /**
   * @returns
   */
  public async getMakerList() {
    if (this.makerList) {
      return this.makerList
    }

    // In the future, it will be obtained from the Internet
    if (this.network == 'Mainnet') {
      return (this.makerList = makerList_mainnet)
    } else {
      return (this.makerList = makerList_testnet)
    }
  }

  /**
   * @param fromChain
   * @param toChain
   */
  public async filter(fromChain?: BridgeChain, toChain?: BridgeChain) {
    const tokens: BridgeToken[] = []
    const fromChains: BridgeChain[] = []
    const toChains: BridgeChain[] = []

    const makerList = await this.getMakerList()
    for (const item of makerList) {
      this.expandMakerInfo(item).forEach((makerInfo) => {
        // Push tokens
        const findIndexToken = tokens.findIndex(
          (_token) =>
            equalsIgnoreCase(_token.address, makerInfo.fromTokenAddress) &&
            _token.chainId == makerInfo.fromChainId
        )
        if (findIndexToken === -1 && (!toChain || toChain.id == makerInfo.toChainId)) {
          tokens.push({
            chainId: makerInfo.fromChainId,
            address: makerInfo.fromTokenAddress,
            name: makerInfo.tokenName,
            precision: makerInfo.precision,
            makerAddress: makerInfo.makerAddress,
          })
        }

        // Push fromChains.
        // Warnning: dYdX cannot transfer out now!
        if (
          (!toChain || toChain.id == makerInfo.toChainId) &&
          ChainValidator.dydx(makerInfo.fromChainId) === undefined
        ) {
          const findIndexFromChain = fromChains.findIndex(
            (_chain) => _chain.id == makerInfo.fromChainId
          )
          if (findIndexFromChain === -1) {
            fromChains.push({
              id: makerInfo.fromChainId,
              name: makerInfo.fromChainName,
              networkId: config.orbiterChainIdToNetworkId[makerInfo.fromChainId],
            })
          }
        }

        // Push toChains
        if (!fromChain || fromChain.id == makerInfo.fromChainId) {
          const findIndexToChain = toChains.findIndex((_chain) => _chain.id == makerInfo.toChainId)
          if (findIndexToChain === -1) {
            toChains.push({
              id: makerInfo.toChainId,
              name: makerInfo.toChainName,
              networkId: config.orbiterChainIdToNetworkId[makerInfo.toChainId],
            })
          }
        }
      })
    }

    return { tokens, fromChains, toChains }
  }

  /**
   * @param token
   * @param fromChain
   * @param toChain
   * @returns
   */
  public async getTargetMakerInfo(
    token: BridgeToken,
    fromChain: BridgeChain,
    toChain: BridgeChain
  ) {
    const makerList = await this.getMakerList()

    // Use map to maintain type deduction
    const targets = makerList
      .map((item) => {
        const expand = this.expandMakerInfo(item)

        // Normal
        if (
          expand[0].fromChainId == fromChain.id &&
          expand[0].toChainId == toChain.id &&
          equalsIgnoreCase(expand[0].fromTokenAddress, token.address)
        ) {
          return expand[0]
        }

        // Reverse
        if (
          expand[1].fromChainId == fromChain.id &&
          expand[1].toChainId == toChain.id &&
          equalsIgnoreCase(expand[1].fromTokenAddress, token.address)
        ) {
          return expand[1]
        }

        return undefined
      })
      .filter((item) => item !== undefined)

    if (targets.length < 1) {
      throw new Error('Orbiter cannot find target maker info!')
    }

    // Only return first. Normally there is only one record here
    return targets[0]
  }

  /**
   * @param token
   * @param fromChain
   * @param toChain
   * @param amountHm Human readable amount
   */
  public async getAmounts(
    token: BridgeToken,
    fromChain: BridgeChain,
    toChain: BridgeChain,
    amountHm: string | number
  ) {
    const targetMakerInfo = await this.getTargetMakerInfo(token, fromChain, toChain)
    const { tradingFee, precision, minPrice, maxPrice } = targetMakerInfo

    // Check minPrice, maxPrice
    if (amountHm < minPrice) {
      throw new Error(
        `Orbiter get amounts failed: amount less than minPrice(${minPrice}), token: ${token.name}, fromChain: ${fromChain.name}, toChain: ${toChain.name}`
      )
    }
    if (amountHm > maxPrice) {
      throw new Error(
        `Orbiter get amounts failed: amount greater than maxPrice(${maxPrice}), token: ${token.name}, fromChain: ${fromChain.name}, toChain: ${toChain.name}`
      )
    }

    const amount = utils.parseUnits(Number(amountHm).toFixed(precision), precision)
    const userAmount = amount.add(utils.parseUnits(tradingFee + '', precision))

    const receiveAmountHm = core
      .getToAmountFromUserAmount(utils.formatUnits(userAmount, precision), targetMakerInfo, false)
      .toString()

    const p_text = 9000 + Number(toChain.id) + ''
    const result = core.getTAmountFromRAmount(fromChain.id, userAmount, p_text)
    if (!result.state) {
      throw new Error(
        'Obirter get total amount failed! Please check if the amount matches the rules!'
      )
    }
    const payAmount = ethers.BigNumber.from(result.tAmount + '')
    const payAmountHm = utils.formatUnits(payAmount, precision)

    return { payAmount, payAmountHm, receiveAmountHm }
  }

  /**
   * @param provider
   * @param token
   * @param fromChain
   * @param toChain
   * @param amountHm
   * @param options
   */
  public async transfer(
    provider: providers.ExternalProvider | providers.JsonRpcFetchFunc,
    token: BridgeToken,
    fromChain: BridgeChain,
    toChain: BridgeChain,
    amountHm: string | number,
    options?: TransactionTransferOptions
  ) {
    if (!provider) {
      throw new Error('Orbiter bridge transfer miss params: provider')
    }

    const amounts = await this.getAmounts(token, fromChain, toChain, amountHm)
    const transferOptions = {
      amount: amounts.payAmount,
      tokenAddress: token.address,
      toAddress: token.makerAddress,
      ...options,
    }

    // When provider is metamask, switch network
    if ((<any>provider).isMetaMask === true) {
      await ensureMetamaskNetwork(fromChain.id, provider)
    }

    // Web3
    if (ChainValidator.loopring(fromChain.id)) {
      return
    }

    if (ChainValidator.dydx(fromChain.id)) {
      // dYdx cannot transfer out now
      return
    }

    // Web3Provider
    const signer = new Web3Provider(provider).getSigner()
    if (ChainValidator.zksync(fromChain.id)) {
      const tZksync = new TransactionZksync(fromChain.id, signer)
      return await tZksync.transfer(transferOptions)
    }

    if (ChainValidator.immutablex(fromChain.id)) {
      const tImx = new TransactionImmutablex(fromChain.id, signer)
      return await tImx.transfer({
        ...transferOptions,
        decimals: token.precision,
        symbol: token.name,
      })
    }

    const tEvm = new TransactionEvm(fromChain.id, signer)
    return await tEvm.transfer(transferOptions)
  }
}
