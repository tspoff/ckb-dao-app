import { action, observable } from "mobx";
import RootStore from "../../stores/RootStore";
import { Cell } from "src/ckb-helpers";
const axios = require("axios");

// Super lightweight solution to 'subscribe' to blockchain data - this role will be taken over by indexer
export default class CkbIndexerService {
  indexerURI: string;
  rootStore: RootStore;

  constructor(rootStore: RootStore, indexerURI: string) {
    this.rootStore = rootStore;
    this.indexerURI = indexerURI;
  }

  async getCells(params): Promise<any> {
    try {
      console.log('[Fetch] getCells');
      const response = await axios.post(`${this.indexerURI}/get-cells`, params);
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
}