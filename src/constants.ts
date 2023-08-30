import { CHAIN_ID } from "@govtechsg/tradetrust-utils/constants/supportedChains";

// addresses exists as txt-records in respective domains
export const buildData = [
  {
    chainId: "51" as CHAIN_ID,
    documentStoreAddress: "0x268852277C0eED5A9999B41b0FdbA0443De76475",
    tokenRegistryAddress: "0x1a378fEEc3ed9B63B872B11561FCf19f6d2CE793",
    dnsVerifiable: "tradetrust-apothem.xdc.network",
    dnsTransferableRecord: "tradetrust-apothem.xdc.network",
    dnsDid: "tradetrust-apothem.xdc.network",
  },
  {
    chainId: "80001" as CHAIN_ID,
    documentStoreAddress: "0x93092C2B449712281008112870063fF439367C00",
    tokenRegistryAddress: "0x072FB36B73a7f52A23ea53162583f78ba3Bc6DEa",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  {
    chainId: "11155111" as CHAIN_ID,
    documentStoreAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    tokenRegistryAddress: "0x142Ca30e3b78A840a82192529cA047ED759a6F7e",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  {
    chainId: "1337" as CHAIN_ID, // local network will skip dns verifier
    documentStoreAddress: "0x63a223e025256790e88778a01f480eba77731d04",
    tokenRegistryAddress: "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF",
    dnsVerifiable: "example.com",
    dnsTransferableRecord: "example.com",
    dnsDid: "example.com",
  },
];
