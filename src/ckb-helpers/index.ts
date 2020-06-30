import BigNumber from 'bignumber.js'

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

export enum HashType {
    Data = "data",
    Type = "type"
}

export interface CellConstructor {
    capacity: BigNumber;
    lock: Script | null;
    type: Script | null;
    data: string;
    out_point?: Outpoint;
}
export class Cell {
    capacity: BigNumber;
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
        return new Cell(
            {
                capacity: new BigNumber(jsonCell.cell_output.capacity),
                lock: jsonCell.cell_output.lock,
                type: jsonCell.cell_output.type,
                data: jsonCell.data,
                out_point: jsonCell.out_point
            }
        );
    }

    serializeJson() {
        console.log('capacity check',
        {
            decimal: this.capacity.toString(),
            hex: this.capacity.toString(16)
        });
        return {
            capacity: this.capacity.toString(16),

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