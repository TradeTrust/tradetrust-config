import { CHAIN_ID } from "@tradetrust-tt/tradetrust-utils/constants/supportedChains";

// addresses exists as txt-records in respective domains
export const buildData = [
  // Stability testnet
  {
    chainId: "20180427" as CHAIN_ID,
    documentStoreAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    tokenRegistryAddress: "0xA594f6e10564e87888425c7CC3910FE1c800aB0B",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Stability mainnet
  {
    chainId: "101010" as CHAIN_ID,
    documentStoreAddress: "0xA594f6e10564e87888425c7CC3910FE1c800aB0B",
    tokenRegistryAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // XDC Apothem Testnet
  {
    chainId: "51" as CHAIN_ID,
    documentStoreAddress: "0x93092C2B449712281008112870063fF439367C00",
    tokenRegistryAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Sepolia
  {
    chainId: "11155111" as CHAIN_ID,
    documentStoreAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    tokenRegistryAddress: "0x142Ca30e3b78A840a82192529cA047ED759a6F7e",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Local
  {
    chainId: "1337" as CHAIN_ID, // local network will skip dns verifier
    documentStoreAddress: "0x63a223e025256790e88778a01f480eba77731d04",
    tokenRegistryAddress: "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF",
    dnsVerifiable: "example.com",
    dnsTransferableRecord: "example.com",
    dnsDid: "example.com",
  },
  // Amoy
  {
    chainId: "80002" as CHAIN_ID,
    documentStoreAddress: "0x93092C2B449712281008112870063fF439367C00",
    tokenRegistryAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Astron
  {
    chainId: "1338" as CHAIN_ID,
    documentStoreAddress: "0xA594f6e10564e87888425c7CC3910FE1c800aB0B",
    tokenRegistryAddress: "0xF717d93C751F1835078B513275B14121798C7740",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // AstronTestnet
  {
    chainId: "21002" as CHAIN_ID,
    documentStoreAddress: "0xdAEe89A37fEEBCBFAc94aBA63Fb163808dAc38Fb",
    tokenRegistryAddress: "0x57d6E7F04939445f5Ef6cAcDBcCe66bef507e31f",
    dnsVerifiable: "dev-astronlayer2.bitfactory.cn",
    dnsTransferableRecord: "dev-astronlayer2.bitfactory.cn",
    dnsDid: "dev-astronlayer2.bitfactory.cn",
  },
];
