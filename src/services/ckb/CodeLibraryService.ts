import { action, observable } from "mobx";
import RootStore from "../../stores/RootStore";
import { Cell, CellDep, DepType, HashType } from "../../ckb-helpers";

export enum KnownCodeLibs {
  Secp256k1 = "Secp256k1",
  AnyPay = "AnyPay",
  Keccak256 = "Keccak256",
}

interface CodeLibMap {
  [index: string]: CodeLib;
}

interface CodeLib {
  code_hash: string;
  hash_type: HashType;
  cells: CellDep[];
}

export default class CodeLibraryService {
  @observable codeLibs: CodeLibMap;
  @observable codeLibsLoaded = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.codeLibs = {} as CodeLibMap;
  }

  // TODO: Very temporary. Dependencies should be defined by the cell properties in a config file, and optionally show the outpoint where they live. If this outpoint isn't specified, we should search for a cell that matches the library properties.
  @action async initializeKnownCodeLibs() {
    const { ckbNodeService } = this.rootStore;
    let genesisBlock = await ckbNodeService.rpc.get_block_by_number("0x0");

    const secpDep: CellDep = {
      dep_type: DepType.DepGroup,
      out_point: {
        tx_hash: genesisBlock.transactions[1].hash,
        index: "0x0",
      },
    };

    this.codeLibs[KnownCodeLibs.Secp256k1] = {
      code_hash:
        "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
      hash_type: HashType.Data,
      cells: [secpDep],
    };

    this.codeLibsLoaded = true;
    console.log('Code Libs Loaded', this.codeLibs);
  }

  findCodeCells(cells: Cell[]): CellDep[] {
    return [] as CellDep[];
  }

  getCodeHash(codeLib: string) {
    if (this.codeLibs[codeLib]) {
      return this.codeLibs[codeLib].code_hash;
    } else {
      throw new Error(`No code lib for key ${codeLib} found`);
    }
  }

  getHashType(codeLib: string) {
    if (this.codeLibs[codeLib]) {
      return this.codeLibs[codeLib].hash_type;
    } else {
      throw new Error(`No code lib for key ${codeLib} found`);
    }
  }
}
