import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Row, Col } from "../common/Grid";
import VotePanel from "./VotePanel";
import { DAOProposal } from "src/services/aggregator/AggregatorService";

interface Props {
  proposal: DAOProposal;
}

const CardContainer = styled.div`
  font: var(--montserrat);
  display: flex;
  flex-direction: row;
  border: 5px;
  background: blue;
  margin: 10px;
  border-radius: 25px;
  min-height: 200px;
  width: 90%;
`;

const Title = styled.h3`
  font: Montserrat;
  font-size: 16px;
  text-align: center;
  margin: 5px;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VotePanelWrapper = styled.div`
  width: 150px;
`;

const ProposalCard = observer((props: Props) => {
  const { proposal } = props;

  return (
    <CardContainer>
      <SummaryWrapper>
        <Row>
          <Title>{proposal.metadata.title}</Title>
        </Row>
        <Row>
        <Col size={2}>
            <p>{proposal.amount.toString()}</p>
          </Col>
          <Col size={1}>
            ->
          </Col>
          <Col size={3}>
            <p>{proposal.recipientAddress}</p>
          </Col>
        </Row>
        <Row>
          <p>{proposal.metadata.body}</p>
        </Row>
      </SummaryWrapper>
      <VotePanelWrapper>
        <VotePanel proposal={proposal} />
      </VotePanelWrapper>
    </CardContainer>
  );
});

export default ProposalCard;
