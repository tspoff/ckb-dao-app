import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "src/contexts/StoresContext";
import { useServices } from "src/contexts/ServicesContext";
import BigNumber from "bignumber.js";
import Chart from 'chart.js';
import { DAOProposal } from "src/services/aggregator/AggregatorService";
import VoteChart from "./VoteChart";

interface Props {
    proposal: DAOProposal;
}

const VotePanel = observer((props: Props) => {
    const {proposal} = props;

    return <div>
        <VoteChart proposal={proposal}/>
        <p>Vote Yes</p>
    </div>
});
export default VotePanel;
