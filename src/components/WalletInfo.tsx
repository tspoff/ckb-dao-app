import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "../contexts/ServicesContext";
import { Row, Col } from "./common/Grid";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  background: #73AD21;
  border-radius: 25px;
  border: 2px;
`;

const WalletPanel = styled.div``;

const WalletInfo = observer(() => {
  const {
    root: { walletModalStore, ckbTransferService, walletService, codeLibraryService },
  } = useServices();

  let walletText = {
    privateKey: "-",
    publicKey: "-",
    address: "-",
    pubKeyHash: "-",
    balance: "-",
  };

  const openWalletModal = () => {
    walletModalStore.setVisible(true);
  }

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

  return (  
    <Wrapper>
          <WalletPanel onClick={openWalletModal}> {walletText.address}</WalletPanel>
    </Wrapper>
  );
});

export default WalletInfo;
