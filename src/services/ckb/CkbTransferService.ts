import RootStore from '../../stores/RootStore';
import { Script, Cell, Transaction } from './TxGeneratorService';
import { observable } from 'mobx';

interface BalanceMap {
    [index: string]: number;
}

export default class CkbTransferService {
    @observable balances: BalanceMap
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    // Accounts are Scripts, but indexed in serialized string from in object.
    serializeScript(account: Script): string {
        return account.toString();
    }

    //TODO: Replace all numbers with some BN representation
    getBalance(account: Script): number {
        return 0;
        // const balance = this.balances[this.serializeScript(account)];

        // if (balance) {
        //     return balance;
        // } else {
        //     return 0;
        // }
    }

    async fetchBalance(account: Script) {
        const {ckbIndexerService, txGeneratorService} = this.rootStore;
        const cells = await ckbIndexerService.getCellsByLockScript(account);
        return txGeneratorService.sumCapacity(cells);
    }

    async transferCkb(sender: Script, recipient: Script, amount: number): Promise<any> {
        const {ckbNodeService, walletService} = this.rootStore;

        const tx = await this.generateCkbTransferTX(sender, recipient, amount);
        const sig = walletService.sign(tx);
        tx.setWitnesses([sig]);
        return await ckbNodeService.sendTransaction(tx);
    }

    async generateCkbTransferTX(sender: Script, recipient: Script, amount: number): Promise<Transaction> {
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
