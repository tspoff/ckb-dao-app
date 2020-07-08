import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "src/contexts/StoresContext";
import { useServices } from "src/contexts/ServicesContext";
import BigNumber from "bignumber.js";
import { Doughnut } from 'react-chartjs-2';
import { DAOProposal } from "src/services/aggregator/AggregatorService";

interface Props {
    proposal: DAOProposal;
}
const VoteChart = observer((props: Props) => {
    const {proposal} = props;
    const requiredVoteTreshold = new BigNumber(1000000);
    const currentVoteThreshold = proposal.signatures.length > 0 ? new BigNumber(1000000) : new BigNumber(0);
    const currentPercentage = currentVoteThreshold.div(requiredVoteTreshold).times(100);
    const remainingPercentage = new BigNumber(100).minus(currentPercentage);

    console.log({
        currentPercentage: currentPercentage.toString(),
        remainingPercentage: remainingPercentage.toString()
    })
    
    const data = {
        // labels: ['Yes', 'Undecided'],
        datasets: [{
            label: '# of Votes',
            data: [currentPercentage.toNumber(), remainingPercentage.toNumber()],
            backgroundColor: [
                'rgba(71, 148, 0, 1)',
                'rgba(197, 199, 195, 1)'
            ],
            borderColor: [
                'rgba(71, 148, 0, 0.2)',
                'rgba(197, 199, 195, 0.2)'
            ],
            borderWidth: 2
        }]
    };

    const options = {
        cutoutPercentage: 70
    };

    return <div>
        <Doughnut data={data} options={options} width={50} height={50}/>
        <p>Percentage: {currentPercentage.toFixed(2)}%</p>
    </div>
});
export default VoteChart;
