import { action, observable } from "mobx";
import CKB from "@nervosnetwork/ckb-sdk-core";
import RootStore from "../../stores/RootStore";
import {
  Cell,
  Transaction,
  DepType,
  Script,
  HashType
} from "../../ckb-helpers";
import {
  RPC,
  Reader,
  validators,
  normalizers,
} from "ckb-js-toolkit";
import { ckbHash, arrayBufferToHex } from "src/ckb-helpers/utils";
import * as blockchain from "ckb-js-toolkit-contrib/src/blockchain.js";

interface CellsMap {
  [index: string]: Cell;
}

// Super lightweight solution to 'subscribe' to blockchain data - this role will be taken over by indexer
export default class CkbIndexerService {
  @observable tipBlockNumber: number;
  @observable tip_block_number: number;
  @observable cells_by_lock_hash: CellsMap;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.cells_by_lock_hash = {} as CellsMap;
  }

  @action async fetchCellsByLockScript(lockScript: Script) {
    const { ckbNodeService } = this.rootStore;
    ckbNodeService.rpc.get_cells_by_lock_hash();
  }

  async getCellsByLockHash(lockHash: string) {
    const { ckbNodeService } = this.rootStore;

    let lockScript = {
      code_hash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      hash_type: HashType.Data,
      args: "0x",
    };

    // lockScript = {
    //   code_hash:
    //     "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    //   hash_type: HashType.Type,
    //   args: "0x27fe447b532a2cc8282aa655dec3077b7e5d83a0",
    // };

    lockHash = arrayBufferToHex(
      ckbHash(
        blockchain.SerializeScript(normalizers.NormalizeScript(lockScript))
      ).view.buffer
    );

    console.log({
      lockScript,
      lockHash,
    });

    return await ckbNodeService.fetchCellsByLockHash(lockHash);
  }
}
