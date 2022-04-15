export enum ChainValidatorTypes {
  MAINNET = 1,
  TESTNET = 2,
}

export class ChainValidator {
  static ethereum(chainId: number) {
    if (chainId == 1) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 5) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static arbitrum(chainId: number) {
    if (chainId == 2) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 22) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static zksync(chainId: number) {
    if (chainId == 3) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 33) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static starknet(chainId: number) {
    if (chainId == 3) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 33) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static polygon(chainId: number) {
    if (chainId == 6) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 66) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static optimism(chainId: number) {
    if (chainId == 7) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 77) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static immutable(chainId: number) {
    if (chainId == 8) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 88) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static loopring(chainId: number) {
    if (chainId == 9) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 99) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static metis(chainId: number) {
    if (chainId == 10) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 510) {
      return ChainValidatorTypes.TESTNET
    }
  }

  static dydx(chainId: number) {
    if (chainId == 11) {
      return ChainValidatorTypes.MAINNET
    }
    if (chainId == 511) {
      return ChainValidatorTypes.TESTNET
    }
  }
}
