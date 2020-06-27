// Stores
import CkbNodeService from '../services/ckb/CkbNodeService';
import WalletService from '../services/ckb/WalletService';
import { ConfigService } from '../services/ConfigService';
import IndexerService from '../services/ckb/IndexerService';
import TxGeneratorService from '../services/ckb/TxGeneratorService';
import CodeLibraryService from '../services/ckb/CodeLibraryService';
import CkbTransferService from '../services/ckb/CkbTransferService';

export default class RootStore {
    configService: ConfigService;
    ckbNodeService: CkbNodeService;
    walletService: WalletService;
    indexerService: IndexerService;
    txGeneratorService: TxGeneratorService;
    codeLibraryService: CodeLibraryService;
    ckbTransferService: CkbTransferService;

    constructor() {
        this.configService = new ConfigService();
        this.ckbNodeService = new CkbNodeService(this);
        this.walletService = new WalletService(this);
        this.indexerService = new IndexerService(this);
        this.txGeneratorService = new TxGeneratorService(this);
        this.codeLibraryService = new CodeLibraryService(this);
        this.ckbTransferService = new CkbTransferService(this);

        this.initialize();
    }

    async initialize() {
        this.ckbNodeService.initCkb(this.configService.CKB_RPC_ENDPOINT);
        this.walletService.setActiveWallet(this.configService.PRIVATE_KEY);
        this.indexerService.collectCells();
    }
}
