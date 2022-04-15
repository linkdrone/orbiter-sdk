import chains from './chains'
import chainsApi from './chains_api'

const config = {
  chains,
  chainsApi,
  orbiterChainIdToNetworkId: {} as { [key: number]: string },
}

export default config
