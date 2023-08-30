import walletTestnet from "../../fixtures/config/wallet/wallet-testnet.json";
import walletXDCTestNet from "../../fixtures/config/wallet/wallet-apothem.json";
import walletGanache from "../../fixtures/config/wallet/wallet-ganache.json";
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
  encryptedJson: JSON.stringify(walletTestnet),
};

export const walletApothem: WalletEncryptedJson = {
  type: "ENCRYPTED_JSON",
  encryptedJson: JSON.stringify(walletXDCTestNet),
};

export const walletLocal: WalletEncryptedJson = {
  type: "ENCRYPTED_JSON",
  encryptedJson: JSON.stringify(walletGanache),
};
