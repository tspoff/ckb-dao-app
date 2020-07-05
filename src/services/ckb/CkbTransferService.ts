import RootStore from '../../stores/RootStore';
import { Cell, Transaction, Script } from "../../ckb-helpers";
import { action, observable } from 'mobx';
import { scriptToHash } from 'src/ckb-helpers/utils';
import BigNumber from 'bignumber.js';

interface BalanceMap {
    [index: string]: BigNumber;
}

export default class CkbTransferService {
    @observable balances: BalanceMap
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
        const {ckbIndexerService, txGeneratorService} = this.rootStore;
        console.log('getting cells');
        const cells = await ckbIndexerService.getCells(lockScript);
        console.log('getting balance');
        const balance = txGeneratorService.sumCapacity(cells);
        console.log('getBalance:', balance.toString());
        this.balances[scriptToHash(lockScript)] = balance;
    }

    async transferCkb(sender: Script, recipient: Script, amount: BigNumber): Promise<any> {
        const {ckbNodeService, walletService} = this.rootStore;

        const tx = await this.generateCkbTransferTX(sender, recipient, amount);
        const sig = walletService.sign(tx);
        tx.setWitnesses([sig]);
        return await ckbNodeService.sendTransaction(tx);
    }

    async generateCkbTransferTX(sender: Script, recipient: Script, amount: BigNumber): Promise<Transaction> {
        const {codeLibraryService, txGeneratorService} = this.rootStore;

        const outputs = [] as Cell[];
        outputs.push(new Cell({
            capacity: amount,
            data: '0x',
            lock: recipient,
            type: null
        }))

        const inputs = await txGeneratorService.gatherInputCapacityForOutputs(sender, outputs);
        const deps = codeLibraryService.findCodeCells([...inputs, ...outputs]);

        return new Transaction(inputs, outputs, deps);

    }
}
