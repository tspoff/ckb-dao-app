import { AddressPrefix, AddressType as Type, pubkeyToAddress } from '@nervosnetwork/ckb-sdk-utils';
import * as ckbUtils from '@nervosnetwork/ckb-sdk-utils';
import { ADDRESS_TYPE_CODEHASH } from '../services/ConfigService';

/* 
Simplified version of Address class from Synapse Extension
Credit: https://github.com/rebase-network/synapse-extension
*/ 

export const publicKeyToAddress = (publicKey: string, prefix = AddressPrefix.Testnet) => {
  const pubkey = publicKey.startsWith('0x') ? publicKey : `0x${publicKey}`;
  return pubkeyToAddress(pubkey, {
    prefix,
    type: Type.HashIdx,
    codeHashOrCodeHashIndex: '0x00',
  });
};

export default class Address {
  publicKey?: string;
  address: string;

  constructor(address: string) {
    this.address = address;
  }

  public static fromPublicKey = (
    publicKey: string,
    path: string,
    prefix: AddressPrefix = AddressPrefix.Testnet,
  ) => {
    const address = publicKeyToAddress(publicKey, prefix);
    const instance = new Address(address);
    instance.publicKey = publicKey;
    return instance;
  };

  //path 默认可以不传
  //prefix 默认可以不传
  public static fromPrivateKey = (
    privateKey: string,
    prefix: AddressPrefix = AddressPrefix.Testnet,
  ) => {
    const publicKey = ckbUtils.privateKeyToPublicKey('0x' + privateKey);
    const instance = Address.fromPublicKey(publicKey, prefix);
    return instance;
  };

  public getBlake160 = () => {
    return '0x' + ckbUtils.blake160(this.publicKey, 'hex');
  };

  public getPublicKeyHash = () => {
    return this.getBlake160();
  };

  public getLockHash = () => {
    const publicKeyHash = this.getBlake160();

    const lockHash = ckbUtils.scriptToHash({
      hashType: 'type',
      codeHash: ADDRESS_TYPE_CODEHASH.Secp256k1,
      args: publicKeyHash,
    });

    return lockHash;
  };
}
