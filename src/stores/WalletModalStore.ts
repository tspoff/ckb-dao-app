import {action, observable} from 'mobx';
import RootStore from './RootStore';

export interface SigningRequest {
    type: SigningRequestType,
    metadata: any,
    messages: string[]
}

export enum SigningRequestType {
    CKB_TRANSFER,
    DAO_PROPOSAL,
}

export enum WalletModalPanels {
    INFO,
    SIGN,
}

export default class WalletModalStore {
    @observable isVisible = false;
    @observable activePanel: WalletModalPanels;
    @observable signingRequest: any;

    rootStore: RootStore;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setVisible(visible: boolean) {
        this.isVisible = visible;
    }

    @action setActivePanel(activePanel: WalletModalPanels) {
        this.activePanel = activePanel;
    }
    
    @action showWalletInfo() {
        this.setActivePanel(WalletModalPanels.INFO);
        this.setVisible(true);
    }

    @action showSignatureRequest(signingRequest: SigningRequest) {
        this.signingRequest = signingRequest;
        this.setActivePanel(WalletModalPanels.SIGN);
        this.setVisible(true);
    }
}
