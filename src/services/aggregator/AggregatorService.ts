/* Store proposals and signatures for DAO */

import RootStore from "src/stores/RootStore";
import { action, observable, toJS } from "mobx";
const axios = require("axios");
export interface DAOProposal {
  daoId: string;
  amount: string;
  recipientAddress: string;
  metadata: {
    title: string;
    body: string;
  };
  signatures: string[];
  tags: string[];
  txSkeleton: any;
}

// Mapping of DAOID -> Proposals
export interface DAOProposalMap {
  [index: string]: DAOProposal;
}

// proposalId -> signatures
export interface SignatureMap {
  [index: string]: string[];
}

export default class AggregatorService {
  @observable daoId: BigInt;
  @observable proposals: DAOProposalMap;
  @observable signatures: SignatureMap;
  @observable aggregatorURI: string;
  @observable defaultProposalTxFee: BigInt;
  rootStore: RootStore;

  constructor(rootStore: RootStore, aggregatorURI: string) {
    this.daoId = BigInt(0);
    this.defaultProposalTxFee = BigInt(100000000);
    this.rootStore = rootStore;
    this.proposals = {} as DAOProposalMap;
    this.aggregatorURI = aggregatorURI;
  }

  @action async fetchProposals() {
    const response = await axios.post(`${this.aggregatorURI}/get-proposals`, {
      daoId: this.daoId.toString(),
    });
    this.proposals = response.data;
    console.log(toJS(this.proposals));
  }

  // Testing function: Proposal tracking will be done by aggregator service once proposals are tracked on decentralized storage.
  @action async clearDatabase() {
    await axios.post(`${this.aggregatorURI}/clear-database`);
  }

  // Testing function: Proposal tracking will be done by aggregator service once proposals are tracked on decentralized storage.
  @action async addProposal(proposal: DAOProposal) {
    const { walletService } = this.rootStore;
    const response = await axios.post(`${this.aggregatorURI}/add-proposal`, {
      sender: walletService.getAddress(),
      proposal,
      txFee: this.defaultProposalTxFee.toString(),
    });

    console.log(response.data);
    this.fetchProposals();
    return response.data;
  }

  @action async addSignatures(proposalId: string, signatures: string[]) {
      console.log('addSignatures', {proposalId, signatures});
      await axios.post(`${this.aggregatorURI}/add-signatures`, {
        proposalId,
        signatures
      }); 
      this.fetchProposals();
  }

  @action async sendProposal(proposalId: string) {
    await axios.post(`${this.aggregatorURI}/send-proposal`, {
        proposalId,
      }); 
      this.fetchProposals();
  }

  private verifyProposalExists(proposalId) {
    if (!this.proposals[proposalId]) {
      throw new Error("Attempting to add signature for untracked proposal");
    }
  }
}
