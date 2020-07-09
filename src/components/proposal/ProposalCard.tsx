import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Row, Col } from "../common/Grid";
import VotePanel from "./VotePanel";
import { DAOProposal } from "src/services/aggregator/AggregatorService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AddressPillbox from "../AddressPillbox";

interface Props {
  proposal: DAOProposal;
}

const CardContainer = styled.div`
  font: var(--montserrat);
  display: flex;
  flex-direction: column;
  background: var(--content-background);
  margin: 10px;
  border: 1px;
  color: var(--content-primary-text);
  border-radius: 10px;
  border-style: solid;
  border-color: var(--content-border);
  min-height: 200px;
`;

const TitleRow = styled(Row)`
  border-bottom: 1px solid var(--content-border);
`;

const Title = styled.h3`
  font: Montserrat;
  font-size: 16px;
  text-align: center;
  padding: 5px;
  margin: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const SummaryPanelWrapper = styled.div`
  width: calc(100% - 150px);
  display: flex;
  flex-direction: column;
`;

const RecipientRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const RecipientRowItem = styled.div`
  margin: auto;
`;

const VotePanelWrapper = styled.div`
  width: 150px;
`;

const ProposalCard = observer((props: Props) => {
  const { proposal } = props;

  return (
    <CardContainer>
      <TitleRow>
        <Title>{proposal.metadata.title}</Title>
      </TitleRow>
      <ContentWrapper>
        <SummaryPanelWrapper>
          <RecipientRow>
            <RecipientRowItem>{proposal.amount.toString()}</RecipientRowItem>
            <RecipientRowItem>
              <FontAwesomeIcon icon={faArrowRight} />
            </RecipientRowItem>
            <RecipientRowItem>
              <AddressPillbox address={proposal.recipientAddress} />
            </RecipientRowItem>
          </RecipientRow>
          <Row>
            <p>{proposal.metadata.body}</p>
          </Row>
        </SummaryPanelWrapper>
        <VotePanelWrapper>
          <VotePanel proposal={proposal} />
        </VotePanelWrapper>
      </ContentWrapper>
    </CardContainer>
  );
});

export default ProposalCard;
