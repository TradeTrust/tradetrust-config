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

export type WalletConfig = WalletEncryptedJson | WalletAws;

type Form = {
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
};

export type FormV2 = Form & {
  defaults: v2.OpenAttestationDocument;
};

export type FormV3 = Form & {
  defaults: v3.OpenAttestationDocument;
};

interface ConfigFile {
  network: "ropsten" | "rinkeby" | "homestead" | "local";
  wallet: WalletConfig;
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
  wallet: WalletConfig;
  documentStoreAddress: string;
  tokenRegistryAddress: string;
  dnsVerifiable: string;
  dnsDid: string;
  dnsTransferableRecord: string;
}

export interface GetUpdatedConfigFileWithFormV2 extends GetUpdatedConfigFile {
  configFile: ConfigFileWithFormV2;
}

export interface GetUpdatedConfigFileWithFormV3 extends GetUpdatedConfigFile {
  configFile: ConfigFileWithFormV3;
}
