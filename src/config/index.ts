import chains from './chains'
import chainsApi from './chains_api'
import abis from './abis'

const orbiterChainIdToNetworkId: { [key: number]: string } = {
  1: '1', // mainnet
  2: '42161', // Arbitrum
  3: '1', // zk
  4: '1', // starknet
  5: '4', // rinkeby
  6: '137', // polygon
  7: '10', // optimism
  8: '1', // mainnet
  9: '1', // loopring
  10: '1088', //metis
  510: '588', //metis test
  11: '1', // dydx
  22: '421611', // arbitrum test
  33: '4', // zktest
  44: '5', // starknet(R)
  66: '80001', // polygon(R)
  77: '69', // optimism(K)
  88: '3', // ropsten
  99: '5', // loopring(G)
  511: '3', // dydx(R)
}

export default {
  chains,
  chainsApi,

  abis,

  orbiterChainIdToNetworkId,
}
