import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "src/contexts/StoresContext";
import { useServices } from "src/contexts/ServicesContext";
import BigNumber from "bignumber.js";
import Chart from "chart.js";
import { DAOProposal } from "src/services/aggregator/AggregatorService";
import VoteChart from "./VoteChart";
import { ckbHash } from "src/ckb-helpers/utils";
import { SigningRequestType } from "src/stores/WalletModalStore";

const VoteButton = styled.button`
  background: beige;
  border: 1px;
  border-radius: 25px;
  margin: auto;
  padding: 5px;
  width: 90%;
`;

interface Props {
  proposal: DAOProposal;
}

const VotePanel = observer((props: Props) => {
  const { proposal } = props;
  const {
    root: { walletModalStore },
  } = useServices();

  const handleVote = async (event) => {
    console.log('handleVote');
    walletModalStore.showSignatureRequest({
      type: SigningRequestType.DAO_PROPOSAL,
      metadata: proposal,
      messages: proposal.txSkeleton["signingRequests"]
    });
    // aggregatorService.addSignature(signature, proposal.proposalId);
    // event.preventDefault();
  };

  return (
    <div>
      <VoteChart proposal={proposal} />
      <VoteButton onClick={handleVote}>Vote Yes</VoteButton>
    </div>
  );
});
export default VotePanel;
