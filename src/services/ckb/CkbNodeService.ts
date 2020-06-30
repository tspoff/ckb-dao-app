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
    
    async fetchCellsByLockHash(lockHash: string): Promise<Cell[]> {
        const collector = new cell_collectors.RPCCollector(this.rpc, lockHash);

        const cells: Cell[] = [];
        for await (const cell of collector.collect()) { 
            cells.push(Cell.fromJsonObject(cell));
            console.log('cell found', cell, Cell.fromJsonObject(cell));
        }
        return cells;
    }
}
