import { action, observable } from 'mobx';
import CKB from '@nervosnetwork/ckb-sdk-core';
import RootStore from '../../stores/RootStore';
import { Script, Cell, Transaction } from './TxGeneratorService';

export default class CkbNodeService {
    @observable ckb: CKB;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action initCkb(url: string) {
        this.ckb = new CKB(url);
    }

    @action async sendTransaction(transaction: Transaction): Promise<any> {
        return true;
    }

    async getCellsByLockHash() {
        return this.ckb.loadCells({
            lockHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8'
        });
    }

    async transferCkb(sender: Script, recipient: Script, amount: number) {
        const {walletService} = this.rootStore;

        const tx = this.generateCkbTransferTX(sender, recipient, amount);
        const sig = walletService.sign(tx);
        tx.setWitnesses([sig]);
    }

    generateCkbTransferTX(sender: Script, recipient: Script, amount: number): Transaction {
        const {codeLibraryService, txGeneratorService} = this.rootStore;

        const outputs = [] as Cell[];
        outputs.push({
            capacity: amount,
            data: '0x',
            lock: recipient,
            type: null
        })

        const inputs = txGeneratorService.gatherInputCapacityForOutputs(sender, outputs);
        const deps = codeLibraryService.findCodeCells([...inputs, ...outputs]);

        return new Transaction(inputs, outputs, deps);

    }
}
