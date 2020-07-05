export const CodeHash = {
  Blake160CodeHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
};

export const EXPLORER_URL = 'https://explorer.nervos.org/aggron';

export const MIN_CELL_CAPACITY = 61;

export const ADDRESS_TYPE_CODEHASH = {
  Secp256k1: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  AnyPay: '0x86a1c6987a4acbe1a887cca4c9dd2ac9fcb07405bbeda51b861b18bbf7492c4b',
  Keccak256: '0xa5b896894539829f5e7c5902f0027511f94c70fa2406d509e7c6d1df76b06f08',
};

export default class ConfigService {
    private getValue(key: string, throwOnMissing = true): string {
      const value = process.env[key];
      if (!value && throwOnMissing) {
        throw new Error(`config error - missing env.${key}`);
      }
  
      return value;
    }
  
    public get(key: string): string {
      return this.getValue(key, true);
    }

    get INDEXER_URI(): string {
      return process.env.REACT_APP_INDEXER_URI || 'http://127.0.0.1:8080';

    }

    get PRIVATE_KEY(): string {
      return process.env.REACT_APP_PRIVATE_KEY || '310e4d6c68f0026499179342f4286bd03a8d510af456d9fe2a31b3f699f0ef05';
    }
  
    // FIXME: cannot get process.env values
    get CKB_RPC_ENDPOINT(): string {
      return process.env.CKB_RPC_ENDPOINT || 'http://106.13.40.34:8117/rpc';
    }
  
    get CKB_INDEXER_ENDPOINT(): string {
      return process.env.CKB_INDEXER_ENDPOINT || 'http://106.13.40.34:8117/indexer';
    }
  
    get CACHE_LAYER_ENDPOINT(): string {
      return process.env.CACHE_LAYER_ENDPOINT || 'http://106.13.40.34:2333';
    }
  
    public ensureValues(keys: string[]) {
      keys.forEach((k) => this.getValue(k, true));
      return this;
    }
  
    public getPort() {
      return this.getValue('PORT', true);
    }
  
    public isProduction() {
      const mode = this.getValue('MODE', false);
      return mode != 'DEV';
    }
  }

  export { ConfigService };
  