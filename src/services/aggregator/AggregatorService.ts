
/* Store proposals and signatures for DAO */

import { Cell } from "src/ckb-helpers";
import BigNumber from "bignumber.js";
import RootStore from "src/stores/RootStore";
import { action, observable } from "mobx";
import { ckbHash } from "src/ckb-helpers/utils";
import { sampleProposals } from "./sampleProposals";

export interface DAOProposal {
    inputs?: Cell[],
    outputs?: Cell[],
    metadata: {
        amount: BigNumber;
        recipientLockHash: string | null;
        recipientTypeHash: string | null;
        recipientAddress: string;
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

    @action addProposal(proposal: DAOProposal) {
        const proposalHash = ckbHash(proposal);
        this.proposals[proposalHash] = proposal;
    }

    @action addSignature(signature: string, proposalHash: string) {
        this.verifyProposalExists(proposalHash);
        this.proposals[proposalHash].signatures.push(signature);
    }

    private verifyProposalExists(proposalHash) {
         if (!this.proposals[proposalHash]) {
            throw new Error('Attempting to add signature for untracked proposal');
         }
    }
}