import RootStore from "../../stores/RootStore";

export enum HashType {
    Data = "data",
    Type = "type"
}
 export interface Script {
    code_hash: string;
    hash_type: HashType;
    args: string;
}

export interface Outpoint {
    tx_hash: string;
    index: number;
}
export interface Cell {
    capacity: number;
    lock: Script | null;
    type: Script | null;
    data: string;
    outpoint?: Outpoint;
}

export class Transaction {
    inputs: Cell[];
    outputs: Cell[];
    deps: Cell[];
    witnesses: string[];

    constructor(inputs = [] as Cell[], outputs = [] as Cell[], deps = [] as Cell[], witnessess = [] as string[]) {
        this.inputs = inputs;
        this.outputs = outputs;
        this.deps = deps;
        this.witnesses = witnessess;
    }

    setWitnesses(witnessess: string[]) {
        this.witnesses = witnessess;
    }
}

export default class TxGeneratorService {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    gatherInputCapacityForOutputs(inputLockScript: Script, outputs: Cell[]): Cell[] {
        const {indexerService} = this.rootStore;
        const inputCells = indexerService.getCellsByLockScript(inputLockScript);

        const requiredOutputCapacity = this.sumCapacity(outputs);

        let inputs = [] as Cell[];
        let inputCapacitySum: number = 0;

        for (let cell of inputCells) {
            if (inputCapacitySum >= requiredOutputCapacity) {
                break;
            }

            inputCapacitySum += cell.capacity;
            inputs.push(cell);
        }

        return inputs;
    }

    sumCapacity(cells: Cell[]): number {
        let capacitySum = 0;
        for (let cell of cells) {
            capacitySum += cell.capacity;
        }
        return capacitySum;
    }

    toScriptHash(script: Script) {
        return script;
    }
}