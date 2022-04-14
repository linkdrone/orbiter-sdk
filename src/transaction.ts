import { Provider } from '@ethersproject/abstract-provider'
import ethers, { providers, Signer } from 'ethers'

export class Transaction {
  private signer?: Signer
  private provider?: Provider

  constructor(signer?: Signer) {
    this.signer = signer
    this.provider = signer && signer.provider
  }

  async transfer(amount: ethers.BigNumberish) {
    console.warn('amount:', amount)
  }
}
