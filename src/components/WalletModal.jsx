import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import JSONPretty from "react-json-pretty";
import { Row, CenteredCol } from "./common/Grid";
import { useServices } from "src/contexts/ServicesContext";
import Modal from "src/components/common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { WalletModalPanels } from "src/stores/WalletModalStore";
import AddressView from "./AddressView";
import CkbTransfer from "./common/CkbTransfer";
import JSONPrettyMon from "react-json-pretty/dist/monikai";
import ActionButton from "./common/ActionButton";

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled(Row)`
  margin: auto;
  padding: 10px;
  padding-top: 20px;
  justify-content: space-between;
`;

const ContentRow = styled(Row)`
  margin: auto;
  padding: 10px;
`;

const ContentCentered = styled.div`
  text-align: center;
  margin: auto;
`;

const JsonWrapper = styled.div`
  text-align: left;
  max-height: 400px;
  max-width: 80vh;
  margin: auto;
  overflow: scroll;
`;

const WalletModal = observer(() => {
  const {
    root: {
      walletModalStore,
      ckbTransferService,
      walletService,
      codeLibraryService,
      aggregatorService,
    },
  } = useServices();

  const visible = walletModalStore.isVisible;
  const activePanel = walletModalStore.activePanel;

  const dismissModal = () => {
    walletModalStore.setVisible(false);
  };

  const signProposal = async () => {
    const { txSkeleton, proposalId } = walletModalStore.signingRequest.metadata;
    console.log("signProposal", toJS(walletModalStore.signingRequest));

    const signatures = [];

    for (let witness of txSkeleton["signingEntries"]) {
      signatures.push(walletService.sign(witness.message));
    }

    aggregatorService.addSignatures(proposalId, signatures).then((response) => {
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
    title: "-",
  };

  if (walletService.hasActiveWallet) {
    walletText.privateKey = walletService.getPrivateKey();
    walletText.publicKey = walletService.getPublicKey();
    walletText.address = walletService.getAddress();
    walletText.pubKeyHash = walletService.getPubKeyHash();
    walletText.title = walletModalStore.getModalTitle();
  }

  if (codeLibraryService.codeLibsLoaded && walletService.hasActiveWallet) {
    const lockHash = walletService.getLockHash();
    walletText.lockHash = lockHash;

    walletText.balance = ckbTransferService.isBalanceLoaded(lockHash)
      ? ckbTransferService.getBalance(lockHash).toString()
      : "-";
  }

  const showBackArrow = () => {
    switch (walletModalStore.activePanel) {
      case WalletModalPanels.SIGN:
        return false;
      case WalletModalPanels.INFO:
        return true;
      default:
        return false;
    }
  };

  const renderActivePanel = () => {
    switch (walletModalStore.activePanel) {
      case WalletModalPanels.SIGN:
        return renderWalletSignPanel();
      case WalletModalPanels.INFO:
        return renderWalletInfoPanel();
      default:
        return renderWalletInfoPanel();
    }
  };

  const renderWalletInfoPanel = () => {
    return (
      <div>
        <AddressView address={walletText.address} />
        <p>PrivateKey: {walletText.privateKey}</p>
        <p>PublicKey: {walletText.publicKey}</p>
        <p>Address: {walletText.address}</p>
        <p>PubKeyHash: {walletText.pubKeyHash}</p>
        <p>LockHash: {walletText.lockHash}</p>
        <br />
        <p>Balance: {walletText.balance}</p>
      </div>
    );
  };

  const renderWalletSignPanel = () => {
    const proposal = walletModalStore.signingRequest.metadata;
    return (
      <React.Fragment>
        <ContentRow>
          <ContentCentered>
            <p>Transfer CKB</p>
          </ContentCentered>
        </ContentRow>
        <ContentRow>
          <ContentCentered>
            <CkbTransfer proposal={proposal} />
          </ContentCentered>
        </ContentRow>
        <ContentRow>
          <ContentCentered>
            <p>Transaction Details</p>
          </ContentCentered>
        </ContentRow>
        <ContentRow>
        <ContentCentered>
            <JsonWrapper>
              <JSONPretty
                data={JSON.stringify(proposal.txSkeleton)}
                theme={JSONPrettyMon}
              />
            </JsonWrapper>
            </ContentCentered>
        </ContentRow>
        <ContentRow>
          <ContentCentered>
            <ActionButton onClick={signProposal}>Approve <FontAwesomeIcon icon={faFileSignature}/></ActionButton>
          </ContentCentered>
        </ContentRow>
      </React.Fragment>
    );
  };

  //@ts-ignore
  return (
    <Modal onDismiss={dismissModal} visible={visible}>
      <ModalWrapper>
        <HeaderRow>
          <CenteredCol size={1}>
            {showBackArrow() && <FontAwesomeIcon icon={faArrowLeft} />}
          </CenteredCol>
          <CenteredCol size={4}>{walletText.title}</CenteredCol>
          <CenteredCol size={1}>
            <FontAwesomeIcon onClick={dismissModal} icon={faTimes} />
          </CenteredCol>
        </HeaderRow>
        {renderActivePanel()}
      </ModalWrapper>
    </Modal>
  );
});
export default WalletModal;
