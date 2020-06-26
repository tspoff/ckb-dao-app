import { action, observable } from 'mobx';
import CKB from '@nervosnetwork/ckb-sdk-core';
import RootStore from 'stores/RootStore';

enum ERRORS {
    UntrackedChainId = 'Attempting to access data for untracked chainId',
    ContextNotFound = 'Specified context name note stored',
    BlockchainActionNoAccount = 'Attempting to do blockchain transaction with no account',
    BlockchainActionNoChainId = 'Attempting to do blockchain transaction with no chainId',
    BlockchainActionNoResponse = 'No error or response received from blockchain action',
}

export default class CkbService {
    @observable ckb: CKB;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action initCkb(url: string) {
        this.ckb = new CKB(url);
    }
}
