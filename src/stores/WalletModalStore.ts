import {action, observable} from 'mobx';
import RootStore from './RootStore';

export enum WalletModalPanels {
    INFO,
    SIGN,
}

export default class WalletModalStore {
    @observable isVisible = false;
    @observable activePanel: WalletModalPanels;
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
}
