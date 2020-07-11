import { action, observable } from "mobx";
import RootStore from "./RootStore";

export interface SigningRequest {
  type: SigningRequestType;
  metadata: any;
  messages: string[];
}

export enum SigningRequestType {
  CKB_TRANSFER = "CKB Transfer",
  DAO_PROPOSAL = "DAO Proposal",
}

export enum WalletModalPanels {
  INFO,
  SIGN,
  CHOOSE_WALLET,
}

export default class WalletModalStore {
  @observable isVisible = false;
  @observable activePanel: WalletModalPanels;
  @observable signingRequest: any;

  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.activePanel = WalletModalPanels.INFO;
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

  getModalTitle() {
    let message = "";

    switch (this.activePanel) {
      case WalletModalPanels.INFO:
        message = "Wallet Info";
        break;
      case WalletModalPanels.CHOOSE_WALLET:
        message = "Choose Walllet";
        break;
      case WalletModalPanels.SIGN:
        message = this.signingRequest.type;
        break;
      default:
        throw new Error("Invalid active panel value in store");
    }
    return `Signature Request: ${message}`;
  }
}
