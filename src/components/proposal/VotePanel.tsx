import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "src/contexts/ServicesContext";
import { DAOProposal } from "src/services/aggregator/AggregatorService";
import VoteChart from "./VoteChart";
import { SigningRequestType } from "src/stores/WalletModalStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVoteYea } from "@fortawesome/free-solid-svg-icons";

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
      <VoteButton onClick={handleVote}>Vote Yes <FontAwesomeIcon icon={faVoteYea} />
</VoteButton>
    </div>
  );
});
export default VotePanel;
