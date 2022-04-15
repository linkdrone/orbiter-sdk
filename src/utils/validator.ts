export enum ChainValidatorTypes {
  Mainnet = 1,
  Testnet = 2,
}

export class ChainValidator {
  static ethereum(chainId: number) {
    if (chainId == 1) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 5) {
      return ChainValidatorTypes.Testnet
    }
  }

  static arbitrum(chainId: number) {
    if (chainId == 2) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 22) {
      return ChainValidatorTypes.Testnet
    }
  }

  static zksync(chainId: number) {
    if (chainId == 3) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 33) {
      return ChainValidatorTypes.Testnet
    }
  }

  static starknet(chainId: number) {
    if (chainId == 3) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 33) {
      return ChainValidatorTypes.Testnet
    }
  }

  static polygon(chainId: number) {
    if (chainId == 6) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 66) {
      return ChainValidatorTypes.Testnet
    }
  }

  static optimism(chainId: number) {
    if (chainId == 7) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 77) {
      return ChainValidatorTypes.Testnet
    }
  }

  static immutablex(chainId: number) {
    if (chainId == 8) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 88) {
      return ChainValidatorTypes.Testnet
    }
  }

  static loopring(chainId: number) {
    if (chainId == 9) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 99) {
      return ChainValidatorTypes.Testnet
    }
  }

  static metis(chainId: number) {
    if (chainId == 10) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 510) {
      return ChainValidatorTypes.Testnet
    }
  }

  static dydx(chainId: number) {
    if (chainId == 11) {
      return ChainValidatorTypes.Mainnet
    }
    if (chainId == 511) {
      return ChainValidatorTypes.Testnet
    }
  }
}
