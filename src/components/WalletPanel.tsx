import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "../contexts/ServicesContext";
import AddressPillbox from "./AddressPillbox";

const WalletPanel = observer(() => {
  const {
    root: { walletModalStore, walletService },
  } = useServices();

  let walletText = {
    address: "-",
  };

  const openWalletModal = () => {
    walletModalStore.showWalletInfo();
  };

  if (walletService.hasActiveWallet) {
    walletText.address = walletService.getAddress();
  }

  return (
    <AddressPillbox onClick={openWalletModal} address={walletText.address} />
  );
});

export default WalletPanel;
