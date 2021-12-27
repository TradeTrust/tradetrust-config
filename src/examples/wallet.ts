import wallet from "../../fixtures/config/wallet/wallet.json";
import { WalletEncryptedJson, WalletAws } from "../types";

export const walletAws: WalletAws = {
  type: "AWS_KMS",
  accessKeyId: "<ACCESS_KEY_ID>",
  region: "<REGION>",
  kmsKeyId: "<KMS_KEY_ID>",
};

export const walletReference: WalletEncryptedJson = {
  type: "ENCRYPTED_JSON",
  encryptedJson: "<WALLET>",
};

export const walletSample: WalletEncryptedJson = {
  type: "ENCRYPTED_JSON",
  encryptedJson: JSON.stringify(wallet),
};
