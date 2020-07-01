import { DAOProposalMap } from "./AggregatorService";

import BigNumber from "bignumber.js";

export const sampleProposals: DAOProposalMap = {
  hash1: {
    metadata: {
      title: "Marketing Proposal",
      body:
        "Erin is requesting compensation for Milestone one of <marketing proposal>",
      amount: new BigNumber(1000000),
      recipientAddress: "ckt....567",
      recipientLockHash: null,
      recipientTypeHash: null,
    },
    tags: ["#funding"],
  },
  hash2: {
    metadata: {
      title: "Development Proposal",
      body:
        "Alice is requesting compensation for Milestone one of <development proposal>",
      amount: new BigNumber(2000000),
      recipientAddress: "ckt....123",
      recipientLockHash: null,
      recipientTypeHash: null,
    },
    tags: ["#funding"],
  },
  hash3: {
    metadata: {
      title: "Voting power for Dave",
      body: "Dave is requesting X voting power for work done for Y",
      amount: new BigNumber(0),
      recipientAddress: "ckt....456",
      recipientLockHash: null,
      recipientTypeHash: null,
    },
    tags: ["#votepower"],
  },
};
