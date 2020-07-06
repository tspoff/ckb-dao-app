
/* Store proposals and signatures for DAO */

import BigNumber from "bignumber.js";
import RootStore from "src/stores/RootStore";
import { action, observable } from "mobx";
import { ckbHash } from "src/ckb-helpers/utils";
import { sampleProposals } from "./sampleProposals";

export interface DAOProposal {
    proposalId: string;
    amount: BigNumber;
    recipientLockHash: string | null;
    recipientTypeHash: string | null;
    recipientAddress: string;
    metadata: {
        title: string;
        body: string;
    }
    signatures?: string[],
    tags?: string[]
}

// Mapping of DAOID -> Proposals
export interface DAOProposalMap {
    [index: string]: DAOProposal;
}

export default class AggregatorService {
    @observable daoId: string;
    @observable proposals: DAOProposalMap;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.proposals = sampleProposals;
    }

    //TODO: Identify proposals by HASH on the on-chain data
    @action addProposal(proposal: DAOProposal) {
        if (!proposal.signatures) proposal.signatures = [];
        if (!proposal.tags) proposal.tags = [];

        this.proposals[proposal.proposalId] = proposal;
    }

    @action addSignature(signature: string, proposalId: string) {
        this.verifyProposalExists(proposalId);
        this.proposals[proposalId].signatures.push(signature);
    }

    private verifyProposalExists(proposalId) {
         if (!this.proposals[proposalId]) {
            throw new Error('Attempting to add signature for untracked proposal');
         }
    }
}