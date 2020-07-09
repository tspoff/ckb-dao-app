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

const Panel = styled.div``;

const WalletPanel = observer(() => {
  const {
    root: { walletModalStore, ckbTransferService, walletService, codeLibraryService },
  } = useServices();

  let walletText = {
    address: "-",
  };

  const openWalletModal = () => {
    walletModalStore.showWalletInfo();
  }

  if (walletService.hasActiveWallet) {
    walletText.address = walletService.getAddress();
  }

  return (  
    <Wrapper>
          <Panel onClick={openWalletModal}> {walletText.address}</Panel>
    </Wrapper>
  );
});

export default WalletPanel;
