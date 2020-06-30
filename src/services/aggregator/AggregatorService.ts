
/* Store proposals and signatures for DAO */

import { Cell } from "src/ckb-helpers";
import BigNumber from "bignumber.js";
import RootStore from "src/stores/RootStore";
import { action, observable } from "mobx";
import { ckbHash } from "src/ckb-helpers/utils";

export interface DAOProposal {
    inputs: Cell[],
    outputs: Cell[],
    metadata: {
        amount: BigNumber;
        recipientLockHash: string | null;
        recipientTypeHash: string | null;
        recipientAddress: string;
        title: string;
        body: string;
    }
    signatures?: string[]
}

// Mapping of DAOID -> Proposals
interface ProposalMap {
    [index: string]: DAOProposal;
}

export default class AggregatorService {
    @observable daoId: string;
    @observable proposals: ProposalMap;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.proposals = {} as ProposalMap;
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