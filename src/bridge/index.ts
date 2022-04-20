import { makerList as makerList_mainnet } from './maker_list.mainnet'
import { makerList as makerList_testnet } from './maker_list.testnet'

export type BridgeToken = { name: string; address: string; decimal: number }
export type BridgeChain = {
  id: number // Orbiter's chainId
  name: string
  networkId: number
  makerAddress: string
}
export type BridgeNetwork = 'Mainnet' | 'Testnet'

export class Bridge {
  private network: BridgeNetwork = 'Testnet'

  constructor(network: BridgeNetwork) {
    this.network = network
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
    if (this.network == 'Mainnet') {
      return makerList_mainnet
    } else {
      return makerList_testnet
    }
  }

  /**
   * @param token
   * @param fromChain
   * @param toChain
   */
  public async filter(token?: BridgeToken, fromChain?: BridgeChain, toChain?: BridgeChain) {
    const tokens: BridgeToken[] = []
    const fromChains: BridgeChain[] = []
    const toChains: BridgeChain[] = []

    const makerList = await this.getMakerList()
    for (const item of makerList) {
        // Todo
    }
  }
}
