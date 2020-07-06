import BigNumber from "bignumber.js";

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

interface CellOutput {
    capacity: string;
    lock: Script | null;
    type: Script | null;
}

export class Cell {
    block_header?: string;
    block_number?: string;
    cell_output: CellOutput;
    data: string;
    out_point?: Outpoint;
    constructor(cell) {
        const {block_header, block_number, capacity, lock, type, out_point, data} = cell;

        //TODO: Input validation
        // Store capacity as BigNumber? Avoiding for now for ease of serialization

        this.data = data;
        this.cell_output = {
            capacity,
            lock: lock,
            type: type
        };

        if (block_header) this.block_header = block_header;
        if (block_number) this.block_number = block_number;
        if (out_point) this.out_point = out_point;
    }

    getCapacity(): BigNumber {
        return new BigNumber(this.cell_output.capacity);
    }

    static fromJsonObject(jsonCell) {
        return new Cell(
            {
                block_header: jsonCell.block_header,
                block_number: jsonCell.block_number,
                capacity: jsonCell.cell_output.capacity,
                lock: jsonCell.cell_output.lock,
                type: jsonCell.cell_output.type,
                data: jsonCell.data,
                out_point: jsonCell.out_point
            }
        );
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