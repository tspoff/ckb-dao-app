// Stores
import CkbNodeService from '../services/ckb/CkbNodeService';
import WalletService from '../services/ckb/WalletService';
import { ConfigService } from '../services/ConfigService';
import CkbIndexerService from '../services/ckb/CkbIndexerService';
import TxGeneratorService from '../services/ckb/TxGeneratorService';
import CodeLibraryService from '../services/ckb/CodeLibraryService';
import CkbTransferService from '../services/ckb/CkbTransferService';

export default class RootStore {
    configService: ConfigService;
    ckbNodeService: CkbNodeService;
    walletService: WalletService;
    ckbIndexerService: CkbIndexerService;
    txGeneratorService: TxGeneratorService;
    codeLibraryService: CodeLibraryService;
    ckbTransferService: CkbTransferService;

    constructor() {
        this.configService = new ConfigService();
        this.ckbNodeService = new CkbNodeService(this);
        this.walletService = new WalletService(this);
        this.ckbIndexerService = new CkbIndexerService(this);
        this.txGeneratorService = new TxGeneratorService(this);
        this.codeLibraryService = new CodeLibraryService(this);
        this.ckbTransferService = new CkbTransferService(this);

        this.initialize();
    }

    async initialize() {
        this.ckbNodeService.initRPC(this.configService.CKB_RPC_ENDPOINT);
        this.walletService.setActiveWallet(this.configService.PRIVATE_KEY);
        const latestBlock = await this.ckbNodeService.rpc.get_tip_block_number();
        console.log('latestBlock', latestBlock);
        await this.codeLibraryService.initializeKnownCodeLibs();
        await this.ckbIndexerService.getCellsByLockScript(this.walletService.getLockScript());
    }
}
