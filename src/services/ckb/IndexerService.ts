import RootStore from "../../stores/RootStore";
import { Script, Cell } from "./TxGeneratorService";
const { Indexer, CellCollector } = require('@ckb-lumos/indexer');

export default class IndexerService {
    rootStore: RootStore;
    indexer: any;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    initIndexer(url = 'http://127.0.0.1:8114') {
        this.indexer = new Indexer(url, "/tmp/indexed-data");
        this.indexer.startForever();
    }

    getCellsByLockScript(script: Script): Cell[] {
      // Remember to add outpoints when we get live cells from chain
      return [] as Cell[];
    }

    async collectCells() {
        const collector = new CellCollector(this.indexer, {
            lock: {
              code_hash:
                "0x0000000000000000000000000000000000000000000000000000000000000000",
              hash_type: "data",
              args: "0x62e907b15cbf27d5425399ebf6f0fb50ebb88f18",
            },
          });
          
          for await (const cell of collector.collect()) {
            console.log(cell);
          }
    }
}