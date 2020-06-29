import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "../contexts/ServicesContext";
import { Script } from "../services/ckb/TxGeneratorService";
import { KnownCodeLibs } from "../services/ckb/CodeLibraryService";
import { Row, Col } from "./common/Grid";

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
    privateKey: "",
    publicKey: "",
    address: "",
    pubKeyHash: "",
    balance: "",
  };

  if (walletService.hasActiveWallet && codeLibraryService.codeLibsLoaded) {
    walletText.privateKey = walletService.getPrivateKey();
    walletText.publicKey = walletService.getPublicKey();
    walletText.address = walletService.getAddress();
    walletText.pubKeyHash = walletService.getPubKeyHash();

    const lockScript: Script = {
      code_hash: codeLibraryService.getCodeHash(KnownCodeLibs.Secp256k1),
      hash_type: codeLibraryService.getHashType(KnownCodeLibs.Secp256k1),
      args: walletService.getPubKeyHash(),
    };

    walletText.balance = ckbTransferService.getBalance(lockScript).toString();
  }

  return (
    <Wrapper>
      <Header>
        <Row>
          <Col size={2}>1000 CKB</Col>
          <Col size={5}>{walletText.address}</Col>
        </Row>
      </Header>
      <p>PrivateKey: {walletText.privateKey}</p>
      <p>PublicKey: {walletText.publicKey}</p>
      <p>Address: {walletText.address}</p>
      <p>PubKeyHash: {walletText.pubKeyHash}</p>
    </Wrapper>
  );
});

export default WalletInfo;
