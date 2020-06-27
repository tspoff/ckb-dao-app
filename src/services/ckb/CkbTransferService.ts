import RootStore from '../../stores/RootStore';
import { Script, Cell, Transaction } from './TxGeneratorService';

export default class CkbTransferService {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    async transferCkb(sender: Script, recipient: Script, amount: number): Promise<any> {
        const {ckbNodeService, walletService} = this.rootStore;

        const tx = this.generateCkbTransferTX(sender, recipient, amount);
        const sig = walletService.sign(tx);
        tx.setWitnesses([sig]);
        return await ckbNodeService.sendTransaction(tx);
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
