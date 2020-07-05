import { action, observable } from 'mobx';
import RootStore from '../../stores/RootStore';
import { Cell, Transaction } from "../../ckb-helpers";
import { RPC, cell_collectors } from "ckb-js-toolkit";

export default class CkbNodeService {
    @observable rpc: RPC;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action initRPC(url: string) {
        this.rpc = new RPC(url);
    }

    @action async sendTransaction(transaction: Transaction): Promise<any> {
        return true;
    }
}
