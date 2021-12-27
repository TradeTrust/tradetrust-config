export type WalletEncryptedJson = {
  type: "ENCRYPTED_JSON";
  encryptedJson: string;
};

export type WalletAws = {
  type: "AWS_KMS";
  accessKeyId: string;
  region: string;
  kmsKeyId: string;
};

export type WalletConfig = WalletEncryptedJson | WalletAws;

export type Form = {
  name: string;
  type: "VERIFIABLE_DOCUMENT" | "TRANSFERABLE_RECORD";
  defaults: any; // TODO
  schema: any;
  uiSchema?: any;
  attachments?: {
    allow: boolean;
    accept: string;
  };
  extension?: string;
  fileName?: string;
};

export interface ConfigFile {
  network: "ropsten" | "rinkeby" | "homestead" | "local";
  wallet: WalletConfig;
  forms: Form[];
  documentStorage?: {
    apiKey?: string;
    url: string;
  };
}

export interface GetUpdatedConfigFile {
  wallet: WalletConfig;
  configFile: ConfigFile;
  documentStoreAddress: string;
  tokenRegistryAddress: string;
  dnsVerifiable: string;
  dnsDid: string;
  dnsTransferableRecord: string;
}
