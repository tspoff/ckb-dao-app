import { action, observable } from 'mobx';
import CKB from '@nervosnetwork/ckb-sdk-core';
import RootStore from '../../stores/RootStore';
import { Script, Cell, Transaction, DepType } from './TxGeneratorService';
import { RPC, Reader, validators, normalizers, transformers, cell_collectors } from "ckb-js-toolkit";
import * as blockchain from "ckb-js-toolkit-contrib/src/blockchain.js";

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
            console.log('cell found', cell);
            cells.push(Cell.fromJsonObject(cell));
        }
        return cells;
    }
}
