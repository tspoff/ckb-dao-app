import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "src/contexts/StoresContext";
import { useServices } from "src/contexts/ServicesContext";
import Modal from "src/components/common/Modal";

const WalletModal = observer(() => {
  const {
    root: { walletModalStore, ckbTransferService, walletService, codeLibraryService },
  } = useServices();
  
  let visible = walletModalStore.isVisible;

  const dismissModal = () => {
    walletModalStore.setVisible(false);
  }

  let walletText = {
    privateKey: "-",
    publicKey: "-",
    address: "-",
    pubKeyHash: "-",
    balance: "-",
  };

  if (walletService.hasActiveWallet) {
    walletText.privateKey = walletService.getPrivateKey();
    walletText.publicKey = walletService.getPublicKey();
    walletText.address = walletService.getAddress();
    walletText.pubKeyHash = walletService.getPubKeyHash();
  }

  if (codeLibraryService.codeLibsLoaded && walletService.hasActiveWallet) {
    const lockHash = walletService.getLockHash();
    walletText.balance = ckbTransferService.isBalanceLoaded(lockHash) ? ckbTransferService.getBalance(lockHash).toString() : "-";
  }

  console.log('Modal Render', visible);

  //@ts-ignore
  return (
    <div>
    <Modal
      onDismiss={dismissModal}
      visible={visible}
    >
      <div>
      <p>PrivateKey: {walletText.privateKey}</p>
      <p>PublicKey: {walletText.publicKey}</p>
      <p>Address: {walletText.address}</p>
      <p>PubKeyHash: {walletText.pubKeyHash}</p>
      </div>
    </Modal>
    </div>
  );
});
export default WalletModal;
