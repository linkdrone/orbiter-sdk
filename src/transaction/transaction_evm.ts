import { ethers, utils } from 'ethers'
import abis from '../config/abis'
import { isEthTokenAddress } from '../utils'
import { Transaction, TransactionTransferOptions } from './transaction'

export class TransactionEvm extends Transaction {
  /**
   * @param options
   */
  public async transfer(options: TransactionTransferOptions) {
    const accountAddress = await this.signer.getAddress()
    const amountHex = utils.hexlify(options.amount)

    if (isEthTokenAddress(options.tokenAddress)) {
      // When tokenAddress is eth

      // const gasLimit = await getTransferGasLimit(
      //   fromChainID,
      //   selectMakerInfo,
      //   from,
      //   selectMakerInfo.makerAddress,
      //   value
      // )
      const gasLimit = 100

      return await this.signer.sendTransaction({
        to: options.toAddress,
        value: amountHex,
        gasLimit: gasLimit,
      })
    } else {
      // When tokenAddress is erc20
      const contract = new ethers.Contract(options.tokenAddress, abis.erc20, this.signer)
      if (!contract) {
        throw new Error('Failed to obtain contract information, please refresh and try again')
      }

      // const gasLimit = await getTransferGasLimit(
      //   fromChainID,
      //   selectMakerInfo,
      //   account,
      //   to,
      //   tValue.tAmount
      // )
      const gasLimit = 10086

      return await contract.transfer(options.toAddress, amountHex, {
        gasLimit: gasLimit,
      })
    }
  }
}
