import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "src/contexts/StoresContext";
import { useServices } from "src/contexts/ServicesContext";
import Modal from "src/components/common/Modal";

const WalletModal = observer(() => {
  const {
    root: { ckbTransferService, walletService, codeLibraryService },
  } = useServices();

  const {
    root: { walletModalStore },
  } = useStores();

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

  //@ts-ignore
  return (
    <Modal
      isOpen={walletModalStore.isVisible}
      onDismiss={walletModalStore.setVisible(false)}
      minHeight={null}
      maxHeight={90}
    >
      <div>
      <p>PrivateKey: {walletText.privateKey}</p>
      <p>PublicKey: {walletText.publicKey}</p>
      <p>Address: {walletText.address}</p>
      <p>PubKeyHash: {walletText.pubKeyHash}</p>
      </div>
    </Modal>
  );
});
export default WalletModal;
