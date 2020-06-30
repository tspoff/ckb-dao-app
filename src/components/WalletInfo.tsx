import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "../contexts/ServicesContext";
import { Row, Col } from "./common/Grid";
import CreateProposal from "./CreateProposal";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 8px;
`;

const Header = styled.div`
  width: 100%;
  padding-top: 8px;
`;

const WalletInfo = observer(() => {
  const {
    root: { ckbTransferService, walletService, codeLibraryService },
  } = useServices();

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

  return (
    <Wrapper>
      <Header>
        <Row>
          <Col size={5}>CKB-DAO</Col>
          <Col size={1}>{walletText.balance} CKB</Col>
          <Col size={4}>{walletText.address}</Col>
        </Row>
      </Header>
      <p>PrivateKey: {walletText.privateKey}</p>
      <p>PublicKey: {walletText.publicKey}</p>
      <p>Address: {walletText.address}</p>
      <p>PubKeyHash: {walletText.pubKeyHash}</p>
      <CreateProposal/>
    </Wrapper>
  );
});

export default WalletInfo;
