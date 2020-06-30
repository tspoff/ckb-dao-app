import { action, observable } from "mobx";
import RootStore from "../../stores/RootStore";
import { Script } from "../../ckb-helpers";
import { KnownCodeLibs } from "./CodeLibraryService";
import { ckbHash, scriptToHash } from "src/ckb-helpers/utils";
import Address from "src/ckb-helpers/Address";

interface Wallet {
  privateKey: string;
  address: Address;
}

export default class WalletService {
  @observable hasActiveWallet: boolean = false;
  @observable activeWallet: Wallet;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action setActiveWallet(privateKey: string) {
    this.activeWallet = {
      privateKey,
      address: Address.fromPrivateKey(privateKey),
    };
    this.hasActiveWallet = true;
  }

  //TODO: How to serialize the TX properly for signing?
  sign(data: any): string {
    return "";
  }

  getPrivateKey() {
    return this.activeWallet.privateKey;
  }

  getPublicKey() {
    return this.activeWallet.address.publicKey;
  }

  getAddress() {
    return this.activeWallet.address.address;
  }

  getPubKeyHash() {
    return this.activeWallet.address.getPublicKeyHash();
  }

  getLockHash() {
    return scriptToHash(this.getLockScript());
  }

  getLockScript(): Script {
    const { codeLibraryService } = this.rootStore;
    return {
      code_hash: codeLibraryService.getCodeHash(KnownCodeLibs.Secp256k1),
      hash_type: codeLibraryService.getHashType(KnownCodeLibs.Secp256k1),
      args: this.getPubKeyHash(),
    };
  }
}
