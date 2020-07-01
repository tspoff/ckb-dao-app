// Stores
import CkbNodeService from '../services/ckb/CkbNodeService';
import WalletService from '../services/ckb/WalletService';
import { ConfigService } from '../services/ConfigService';
import CkbIndexerService from '../services/ckb/CkbIndexerService';
import TxGeneratorService from '../services/ckb/TxGeneratorService';
import CodeLibraryService from '../services/ckb/CodeLibraryService';
import CkbTransferService from '../services/ckb/CkbTransferService';
import AggregatorService from '../services/aggregator/AggregatorService';
import WalletModalStore from './WalletModalStore';

export default class RootStore {
    configService: ConfigService;
    ckbNodeService: CkbNodeService;
    walletService: WalletService;
    ckbIndexerService: CkbIndexerService;
    txGeneratorService: TxGeneratorService;
    codeLibraryService: CodeLibraryService;
    ckbTransferService: CkbTransferService;
    aggregatorService: AggregatorService;
    walletModalStore: WalletModalStore;

    constructor() {
        this.configService = new ConfigService();
        this.ckbNodeService = new CkbNodeService(this);
        this.walletService = new WalletService(this);
        this.ckbIndexerService = new CkbIndexerService(this);
        this.txGeneratorService = new TxGeneratorService(this);
        this.codeLibraryService = new CodeLibraryService(this);
        this.ckbTransferService = new CkbTransferService(this);
        this.aggregatorService = new AggregatorService(this);
        
        this.walletModalStore = new WalletModalStore(this);

        this.initialize();
    }

    async initialize() {
        this.ckbNodeService.initRPC(this.configService.CKB_RPC_ENDPOINT);
        this.walletService.setActiveWallet(this.configService.PRIVATE_KEY);
        const latestBlock = await this.ckbNodeService.rpc.get_tip_block_number();
        console.log('latestBlock', latestBlock);
        console.log('Reading code libs');
        await this.codeLibraryService.initializeKnownCodeLibs();
        console.log('Getting balance for user Wallet');
        await this.ckbTransferService.fetchBalance(this.walletService.getLockHash());
    }
}
