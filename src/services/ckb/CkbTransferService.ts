import RootStore from "../../stores/RootStore";
import { Script } from "../../ckb-helpers";
import { action, observable } from "mobx";
import { scriptToHash } from "src/ckb-helpers/utils";
import BigNumber from "bignumber.js";
interface BalanceMap {
  [index: string]: BigNumber;
}

export default class CkbTransferService {
  @observable balances: BalanceMap;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.balances = {} as BalanceMap;
  }

  isBalanceLoaded(lockHash: string) {
    return !!this.balances[lockHash];
  }

  //TODO: Replace all numbers with some BN representation
  getBalance(lockHash: string): BigNumber {
    const balance = this.balances[lockHash];

    if (balance) {
      return balance;
    } else {
      return new BigNumber(0);
    }
  }

  @action async fetchBalance(lockScript: Script) {
    const { ckbIndexerService, txGeneratorService } = this.rootStore;
    const cells = await ckbIndexerService.getCells(lockScript);
    const balance = txGeneratorService.sumCapacity(cells);
    this.balances[scriptToHash(lockScript)] = balance;
  }
}
