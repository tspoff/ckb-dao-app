import React, { useState } from "react";
import BigNumber from "bignumber.js";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "../contexts/ServicesContext";
import { Row, Col } from "./common/Grid";
import { DAOProposal } from "src/services/aggregator/AggregatorService";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 8px;
`;

const Header = styled.div`
  width: 100%;
  padding-top: 8px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const CreateProposalForm = observer(() => {
  const {
    root: { aggregatorService },
  } = useServices();

  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalText, setProposalText] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const handleProposalTitleChange = (event) => {
    setProposalTitle(event.target.value);
    event.preventDefault();
  };

  const handleProposalTextChange = (event) => {
    setProposalText(event.target.value);
    event.preventDefault();
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    //Validate + set error messages
    event.preventDefault();
  };

  const handleRecipientAddressChange = (event) => {
      setRecipientAddress(event.target.value);
      event.preventDefault();
    }

  const handleSubmit = (event) => {
    //Input validation

    const proposal: DAOProposal = {
      daoId: BigInt(0).toString(),
      amount: BigInt(amount).toString(),
      recipientAddress: recipientAddress,
      metadata: {
        title: proposalTitle,
        body: proposalText,
      },
      signatures: [],
      tags: ["#funding"],
      txSkeleton: {}
    };

    aggregatorService.addProposal(proposal);
  };

  return (
    <Wrapper>
      <Row>New Proposal</Row>
      <Row>
        <label>Proposal Title</label>
        <input
          value={proposalTitle}
          onChange={handleProposalTitleChange}
        ></input>
      </Row>
      <Row>
        <label>Proposal Text</label>
        <textarea
          value={proposalText}
          onChange={handleProposalTextChange}
          rows={4}
          cols={50}
        ></textarea>
      </Row>
      <Row>
        <label>Recipient Address</label>
        <input value={recipientAddress} onChange={handleRecipientAddressChange}></input>
      </Row>
      <Row>
        <label>CKB Amount</label>
        <input value={amount} onChange={handleAmountChange}></input>
      </Row>
      <Row>
        <Button onClick={handleSubmit}>Submit</Button>
      </Row>
    </Wrapper>
  );
});

export default CreateProposalForm;
