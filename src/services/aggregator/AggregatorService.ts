/* Store proposals and signatures for DAO */

import RootStore from "src/stores/RootStore";
import { action, observable, toJS } from "mobx";
import socketIOClient from "socket.io-client";
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

enum SocketEvents {
  ADD_PROPOSAL = 'addProposal',
  ADD_SIGNATUREs = 'addSignatures',
}

export default class AggregatorService {
  @observable daoId: BigInt;
  @observable proposals: DAOProposalMap;
  @observable signatures: SignatureMap;
  @observable aggregatorURI: string;
  @observable socketIO: any;
  @observable defaultProposalTxFee: BigInt;
  rootStore: RootStore;

  constructor(rootStore: RootStore, aggregatorURI: string) {
    this.daoId = BigInt(0);
    this.defaultProposalTxFee = BigInt(10000);
    this.rootStore = rootStore;
    this.proposals = {} as DAOProposalMap;
    this.aggregatorURI = aggregatorURI;
    this.setupSocketClient(aggregatorURI);
  }

  @action setupSocketClient(uri: string) {
    this.socketIO = socketIOClient(uri);

    this.socketIO.on(SocketEvents.ADD_PROPOSAL, data => {
      console.log('ADD_PROPOSAL', data);
    });
  } 

  @action async fetchProposals() {
    const response = await axios.post(`${this.aggregatorURI}/dao/get-proposals`, {
      daoId: this.daoId.toString(),
    });
    this.proposals = response.data;
    console.log(toJS(this.proposals));
  }

  // Testing function: Proposal tracking will be done by aggregator service once proposals are tracked on decentralized storage.
  @action async clearDatabase() {
    await axios.post(`${this.aggregatorURI}/admin/clear-database`);
  }

  // Testing function: Proposal tracking will be done by aggregator service once proposals are tracked on decentralized storage.
  @action async addProposal(proposal: DAOProposal) {
    const { walletService } = this.rootStore;
    const response = await axios.post(`${this.aggregatorURI}/dao/add-proposal`, {
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
      await axios.post(`${this.aggregatorURI}/dao/add-signatures`, {
        proposalId,
        signatures
      }); 
      this.fetchProposals();
  }

  @action async sendProposal(proposalId: string) {
    const response = await axios.post(`${this.aggregatorURI}/dao/send-proposal`, {
        proposalId,
      }); 
      console.log('sendProposal', {proposalId, response: response.data});
      this.fetchProposals();
  }

  private verifyProposalExists(proposalId) {
    if (!this.proposals[proposalId]) {
      throw new Error("Attempting to add signature for untracked proposal");
    }
  }
}
