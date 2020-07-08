import RootStore from "../../stores/RootStore";
import { Cell, Script } from "src/ckb-helpers";
import { scriptToHash } from "src/ckb-helpers/utils";
const axios = require("axios");

// Super lightweight solution to 'subscribe' to blockchain data - this role will be taken over by indexer
export default class CkbIndexerService {
  indexerURI: string;
  rootStore: RootStore;

  constructor(rootStore: RootStore, indexerURI: string) {
    this.rootStore = rootStore;
    this.indexerURI = indexerURI;
  }

  async getCells(lockScript: Script): Promise<any> {
    try {
      console.log(
        `[Fetch] getCells for lockScript: ${JSON.stringify(
          lockScript
        )} hash: ${scriptToHash(lockScript)}`
      );
      const response = await axios.post(`${this.indexerURI}/get-cells`, {
        lock: lockScript,
      });
      console.log(response);
      const rawCells = JSON.parse(response.data);
      console.log(rawCells);

      const parsedCells: Cell[] = [];
      for (let rawCell of rawCells) {
        parsedCells.push(Cell.fromJsonObject(rawCell));
      }

      return parsedCells;
    } catch (error) {
      console.error(error);
    }
  }

  async addSignatures(proposalId: any, signatures: string[]) {
    const response = await axios.post(
      `${this.indexerURI}/add-signatures`,
      { proposalId, signatures }
    );

    return response;
  }
}
