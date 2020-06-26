// Stores
import CkbService from '../services/ckb/CkbService';
import WalletService from '../services/ckb/WalletService';
import { ConfigService } from '../services/ConfigService';

export default class RootStore {
    configService: ConfigService;
    ckbService: CkbService;
    walletService: WalletService;

    constructor() {
        this.configService = new ConfigService();
        this.ckbService = new CkbService(this);
        this.walletService = new WalletService(this);

        this.initialize();
    }

    async initialize() {
        this.ckbService.initCkb(this.configService.CKB_RPC_ENDPOINT);

        const privateKey = this.configService.PRIVATE_KEY;
        console.log(privateKey);
        this.walletService.setActiveWallet(privateKey);
    }
}
