import RootStore from "../../stores/RootStore";

export enum HashType {
    Data = "data",
    Type = "type"
}

export enum DepType {
    Code = "code",
    DepGroup = "dep_group"
}
 export interface Script {
    code_hash: string;
    hash_type: HashType;
    args: string;
}

export interface Outpoint {
    tx_hash: string;
    index: string;
}

export interface CellConstructor {
    capacity: number;
    lock: Script | null;
    type: Script | null;
    data: string;
    out_point?: Outpoint;
}
export class Cell {
    capacity: number;
    lock: Script | null;
    type: Script | null;
    data: string;
    out_point?: Outpoint;
    constructor(args: CellConstructor) {
        const {capacity, lock, type, data, out_point} = args;
        this.capacity = capacity;
        this.lock = lock;
        this.type = type;
        this.data = data;
        if (out_point) {
            this.out_point = out_point;
        }
    }

    static fromJsonObject(jsonCell) {
        console.log(jsonCell);
        return new Cell(
            {
                capacity: jsonCell.capacity,
                lock: jsonCell.lock,
                type: jsonCell.type,
                data: jsonCell.data,
                out_point: jsonCell.out_point
            }
        );
    }

    serializeJson() {
        return {

        }
    }
}

export interface CellDep {
    dep_type: DepType;
    out_point: Outpoint;
}

export class Transaction {
    inputs: Cell[];
    outputs: Cell[];
    deps: CellDep[];
    witnesses: string[];

    constructor(inputs = [] as Cell[], outputs = [] as Cell[], deps = [] as CellDep[], witnessess = [] as string[]) {
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

    async gatherInputCapacityForOutputs(inputLockScript: Script, outputs: Cell[]): Promise<Cell[]> {
        const {ckbIndexerService} = this.rootStore;
        const inputCells = await ckbIndexerService.getCellsByLockScript(inputLockScript);

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