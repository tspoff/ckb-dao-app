import { DAOProposalMap } from "./AggregatorService";

import BigNumber from "bignumber.js";

export const sampleProposals: DAOProposalMap = {
  "1": {
    proposalId: "1",
    amount: new BigNumber(1000000),
    recipientAddress: "ckt1qyq93ytst2ax2j9z53utjq0srnndxw5cd3sqer8pkt",
    recipientLockHash: null,
    recipientTypeHash: null,
    metadata: {
      title: "Marketing Proposal",
      body:
        "Erin is requesting compensation for Milestone one of <marketing proposal>",
    },
    signatures: [],
    tags: ["#funding"],
  },
  "2": {
    proposalId: "2",
    amount: new BigNumber(2000000),
    recipientAddress: "ckt1qyq93ytst2ax2j9z53utjq0srnndxw5cd3sqer8pkt",
    recipientLockHash: null,
    recipientTypeHash: null,
    metadata: {
      title: "Development Proposal",
      body:
        "Alice is requesting compensation for Milestone one of <development proposal>",
    },
    signatures: [],
    tags: ["#funding"],
  },
  "3": {
    proposalId: "3",
    amount: new BigNumber(0),
    recipientAddress: "ckt1qyq93ytst2ax2j9z53utjq0srnndxw5cd3sqer8pkt",
    recipientLockHash: null,
    recipientTypeHash: null,
    metadata: {
      title: "Voting power for Dave",
      body: "Dave is requesting X voting power for work done for Y",
    },
    signatures: [],
    tags: ["#votepower"],
  },
};
