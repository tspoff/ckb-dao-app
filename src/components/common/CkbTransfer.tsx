import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { DAOProposal } from "src/services/aggregator/AggregatorService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AddressView from "../AddressView";
import CkbValue from "../common/CkbValue";

interface Props {
  proposal: DAOProposal;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipientRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const RecipientRowItem = styled.div`
  margin: auto 10px;
`;

const CkbTransfer = observer((props: Props) => {
  const { proposal } = props;

  return (
        <Wrapper>
          <RecipientRow>
            <RecipientRowItem>
              <CkbValue amount={proposal.amount} />
            </RecipientRowItem>
            <RecipientRowItem>
              <FontAwesomeIcon icon={faArrowRight} />
            </RecipientRowItem>
            <RecipientRowItem>
              <AddressView shorten address={proposal.recipientAddress} />
            </RecipientRowItem>
          </RecipientRow>
        </Wrapper>
  );
});

export default CkbTransfer;
