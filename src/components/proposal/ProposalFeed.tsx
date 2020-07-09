import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useServices } from "src/contexts/ServicesContext";
import { DAOProposalMap } from "src/services/aggregator/AggregatorService";
import ProposalCard from "./ProposalCard";

const ProposalFeed = observer(() => {
    const {
        root: { aggregatorService },
      } = useServices();

      const renderProposalCards = (proposals: DAOProposalMap) => {
        return Object.keys(proposals).map(key => {
            return <ProposalCard proposal={proposals[key]}></ProposalCard>
        })
      }

    return <div>
        {renderProposalCards(aggregatorService.proposals)}
    </div>
});
export default ProposalFeed;
