import { v2, v3 } from "@govtechsg/open-attestation";

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

export type Wallet = WalletEncryptedJson | WalletAws;

/** @internal */
interface Form {
  name: string;
  type: "VERIFIABLE_DOCUMENT" | "TRANSFERABLE_RECORD";
  schema: any;
  uiSchema?: any;
  attachments?: {
    allow: boolean;
    accept: string;
  };
  extension?: string;
  fileName?: string;
}

export interface FormV2 extends Form {
  defaults: v2.OpenAttestationDocument;
}

export interface FormV3 extends Form {
  defaults: v3.OpenAttestationDocument;
}

export type Network =
  | "goerli"
  | "homestead"
  | "local"
  | "sepolia"
  | "matic"
  | "maticmum";

interface ConfigFile {
  network: Network;
  wallet: Wallet;
  documentStorage?: {
    apiKey?: string;
    url: string;
  };
}

export interface ConfigFileWithFormV2 extends ConfigFile {
  forms: FormV2[];
}

export interface ConfigFileWithFormV3 extends ConfigFile {
  forms: FormV3[];
}

interface GetUpdatedConfigFile {
  network: Network;
  wallet: Wallet;
  documentStoreAddress: string;
  tokenRegistryAddress: string;
  dnsVerifiable: string;
  dnsDid: string;
  dnsTransferableRecord: string;
}

/** @internal */
export interface GetUpdatedConfigFileWithFormV2 extends GetUpdatedConfigFile {
  configFile: ConfigFileWithFormV2;
}

/** @internal */
export interface GetUpdatedConfigFileWithFormV3 extends GetUpdatedConfigFile {
  configFile: ConfigFileWithFormV3;
}
