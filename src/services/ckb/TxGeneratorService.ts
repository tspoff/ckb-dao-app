import RootStore from "../../stores/RootStore";
import BigNumber from 'bignumber.js';
import { Outpoint, Script, DepType, Cell } from "../../ckb-helpers";
import { scriptToHash } from "src/ckb-helpers/utils";

export default class TxGeneratorService {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    async gatherInputCapacityForOutputs(inputLockScript: Script, outputs: Cell[]): Promise<Cell[]> {
        const {ckbIndexerService} = this.rootStore;
        const inputCells = await ckbIndexerService.getCells(inputLockScript);

        const requiredOutputCapacity = this.sumCapacity(outputs);

        let inputs = [] as Cell[];
        let inputCapacitySum = new BigNumber(0);

        for (let cell of inputCells) {
            if (inputCapacitySum.gte(requiredOutputCapacity)) {
                break;
            }

            inputCapacitySum = inputCapacitySum.plus(cell.capacity);
            inputs.push(cell);
        }

        return inputs;
    }

    sumCapacity(cells: Cell[]): BigNumber {
        let capacitySum = new BigNumber(0);
        for (let cell of cells) {
            capacitySum = capacitySum.plus(cell.getCapacity());
        }
        return capacitySum;
    }

    toScriptHash(script: Script) {
        return script;
    }
}