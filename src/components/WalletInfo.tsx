import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "../contexts/ServicesContext";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 8px;
`;

const WalletInfo = observer(() => {
  const {
    root: { ckbService, walletService },
  } = useServices();

  let walletText = {
    privateKey: "",
    publicKey: "",
    address: "",
    pubKeyHash: "",
  };
  if (walletService.hasActiveWallet) {
    walletText.privateKey = walletService.getPrivateKey();
    walletText.publicKey = walletService.getPublicKey();
    walletText.address = walletService.getAddress();
    walletText.pubKeyHash = walletService.getPubKeyHash();
  }
  return (
    <Wrapper>
      <p>PrivateKey: {walletText.privateKey}</p>
      <p>PublicKey: {walletText.publicKey}</p>
      <p>Address: {walletText.address}</p>
      <p>PubKeyHash: {walletText.pubKeyHash}</p>
    </Wrapper>
  );
});

export default WalletInfo;
