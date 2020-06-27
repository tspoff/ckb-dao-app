import { action, observable } from 'mobx';
import RootStore from '../../stores/RootStore';
import { AddressPrefix, AddressType as Type, pubkeyToAddress } from '@nervosnetwork/ckb-sdk-utils';
import Address from '../../ckb-helpers/Address';

interface Wallet {
    privateKey: string;
    address: Address;
}

export default class WalletService {
    @observable hasActiveWallet: boolean = false;
    @observable activeWallet: Wallet;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setActiveWallet(privateKey: string) {
        this.activeWallet = {
            privateKey,
            address: Address.fromPrivateKey(privateKey)
        }

        console.log('privateKey: ', '0x' + privateKey);
        console.log('publicKey: ', '0x' + this.activeWallet.address.publicKey);
        console.log('address: ', this.activeWallet.address.address);

        this.hasActiveWallet = true;
    }
    
    //TODO: How to serialize the TX properly for signing?
    sign(data: any): string {
        return '';
    }

    getPrivateKey() {
        return this.activeWallet.privateKey;
    }

    getPublicKey() {
        return this.activeWallet.address.publicKey;
    }

    getAddress() {
        return this.activeWallet.address.address;
    }

    getPubKeyHash() {
        return this.activeWallet.address.getPublicKeyHash();
    }
}

