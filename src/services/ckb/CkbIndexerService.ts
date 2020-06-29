import { action, observable } from 'mobx';
import CKB from '@nervosnetwork/ckb-sdk-core';
import RootStore from '../../stores/RootStore';
import { Script, Cell, Transaction, DepType } from './TxGeneratorService';
import { RPC, Reader, validators, normalizers, transformers, cell_collectors } from "ckb-js-toolkit";
import { ckbHash, arrayBufferToHex } from 'src/ckb-helpers/utils';
import * as blockchain from "ckb-js-toolkit-contrib/src/blockchain.js";

interface CellsMap {
    [index: string]: Cell;
}

// Super lightweight solution to 'subscribe' to blockchain data - this role will be taken over by indexer
export default class CkbIndexerService {    @observable tipBlockNumber: number;
    @observable tip_block_number: number;
    @observable cells_by_lock_hash: CellsMap;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.cells_by_lock_hash = {} as CellsMap;
    }
    
    @action async fetchCellsByLockScript(lockScript: Script) {
        const {ckbNodeService} = this.rootStore;
        ckbNodeService.rpc.get_cells_by_lock_hash()
    }

    async getCellsByLockScript(lockScript: Script) {
        const {ckbNodeService} = this.rootStore;

        let lockHash = ckbHash(blockchain.SerializeScript(normalizers.NormalizeScript(lockScript)));

        console.log({
            lockScript,
            normalized: normalizers.NormalizeScript(lockScript),
            serialized: blockchain.SerializeScript(normalizers.NormalizeScript(lockScript)),
            lockHash
        })

        return await ckbNodeService.fetchCellsByLockHash(lockHash);
    }
}
