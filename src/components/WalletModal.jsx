import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useServices } from "src/contexts/ServicesContext";
import Modal from "src/components/common/Modal";

const WalletModal = observer(() => {
  const {
    root: {
      walletModalStore,
      ckbTransferService,
      walletService,
      codeLibraryService,
      aggregatorService
    },
  } = useServices();

  const visible = walletModalStore.isVisible;
  const activePanel = walletModalStore.activePanel;

  const dismissModal = () => {
    walletModalStore.setVisible(false);
  };

  const signProposal = async () => {
    const {txSkeleton, proposalId} = walletModalStore.signingRequest.metadata;
    console.log('signProposal', toJS(walletModalStore.signingRequest));

    const signatures = [];

    for (let witness of txSkeleton["signingEntries"]) {
      signatures.push(walletService.sign(witness.message));
    }

    aggregatorService.addSignatures(proposalId, signatures).then(response => {
      aggregatorService.sendProposal(proposalId);
    });
    walletModalStore.setVisible(false);
  };

  let walletText = {
    privateKey: "-",
    publicKey: "-",
    address: "-",
    pubKeyHash: "-",
    lockHash: "-",
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
    walletText.lockHash = lockHash;

    walletText.balance = ckbTransferService.isBalanceLoaded(lockHash)
      ? ckbTransferService.getBalance(lockHash).toString()
      : "-";
  }

  const renderWalletInfoPanel = () => {
    return (
      <div>
        <p>PrivateKey: {walletText.privateKey}</p>
        <p>PublicKey: {walletText.publicKey}</p>
        <p>Address: {walletText.address}</p>
        <p>PubKeyHash: {walletText.pubKeyHash}</p>
        <p>LockHash: {walletText.lockHash}</p>
        <br/>
        <p>Balance: {walletText.balance}</p>

      </div>
    );
  };

  const renderWalletSignPanel = () => {
    return (
      <div>
        <p>Message to Sign</p>
        <button onClick={signProposal}>Accept</button>
      </div>
    );
  };

  console.log("Modal Render", visible);

  //@ts-ignore
  return (
    <div>
      <Modal onDismiss={dismissModal} visible={visible}>
        {activePanel === 0 ? renderWalletInfoPanel() : renderWalletSignPanel()}
      </Modal>
    </div>
  );
});
export default WalletModal;
