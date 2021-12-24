import wallet from "../../fixtures/config/wallet/wallet.json";

export const walletReference = {
  type: "ENCRYPTED_JSON",
  encryptedJson: "<WALLET>",
};

export const walletSample = {
  type: "ENCRYPTED_JSON",
  encryptedJson: JSON.stringify(wallet),
};

const getWalletAddress = (wallet: any) => {
  const { encryptedJson } = wallet;
  const { address } = JSON.parse(encryptedJson);
  return address;
};

export const WALLET_ADDRESS = getWalletAddress(walletSample);
