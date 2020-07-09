import { DAOProposalMap } from "./AggregatorService";

export const sampleProposals: DAOProposalMap = {
  "0": {
    daoId: '0',
    amount: BigInt(9000000000).toString(),
    recipientAddress: "ckt1qyq93ytst2ax2j9z53utjq0srnndxw5cd3sqer8pkt",
    metadata: {
      title: "Marketing Proposal",
      body:
        "Erin is requesting compensation for Milestone one of <marketing proposal>",
    },
    signatures: [],
    tags: ["#funding"],
    txSkeleton: {}
  },
  "1": {
    daoId: '0',
    amount: BigInt(8000000000).toString(),
    recipientAddress: "ckt1qyq93ytst2ax2j9z53utjq0srnndxw5cd3sqer8pkt",
    metadata: {
      title: "Development Proposal",
      body:
        "Alice is requesting compensation for Milestone one of <development proposal>",
    },
    signatures: [], 
    tags: ["#funding"],
    txSkeleton: {}
  },
};
