import RootStore from "../../stores/RootStore";
import BigNumber from 'bignumber.js';
import { Cell } from "../../ckb-helpers";

export default class TxGeneratorService {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    sumCapacity(cells: Cell[]): BigNumber {
        let capacitySum = new BigNumber(0);
        for (let cell of cells) {
            capacitySum = capacitySum.plus(cell.getCapacity());
        }
        return capacitySum;
    }
}