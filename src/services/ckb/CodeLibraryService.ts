import RootStore from "../../stores/RootStore"
import {HashType, Cell} from "./TxGeneratorService";

export enum KnownCodeLibs {
    Secp256k1 = 'Secp256k1',
    AnyPay = 'AnyPay',
    Keccak256 = 'Keccak256',
}

interface CodeLibMap {
    [index: string]: CodeLib;
}

interface CodeLib {
    code_hash: string;
    hash_type: HashType;
    cells: any;
}

export default class CodeLibraryService {
    codeLibs: CodeLibMap;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.codeLibs = {} as CodeLibMap;
        this.initializeKnownCodeLibs();
    }

    initializeKnownCodeLibs() {
        this.codeLibs[KnownCodeLibs.Secp256k1] = {
            code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
            hash_type: HashType.Data,
            cells: []
        }
    }

    findCodeCells(cells: Cell[]): Cell[] {
        return [] as Cell[];
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