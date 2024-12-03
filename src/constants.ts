import { CHAIN_ID } from "@tradetrust-tt/tradetrust-utils/constants/supportedChains";

// addresses exists as txt-records in respective domains
export const buildData = [
  // Stability testnet
  {
    chainId: "20180427" as CHAIN_ID,
    documentStoreAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    tokenRegistryAddress: "0x1DC4C199DC3694fD5a46aB0C01403469192eD2dc",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Stability mainnet
  {
    chainId: "101010" as CHAIN_ID,
    documentStoreAddress: "0xA594f6e10564e87888425c7CC3910FE1c800aB0B",
    tokenRegistryAddress: "0x29C67f08994390c1b9786f1F7E1Ed15CB0b391e7",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // XDC Apothem Testnet
  {
    chainId: "51" as CHAIN_ID,
    documentStoreAddress: "0x93092C2B449712281008112870063fF439367C00",
    tokenRegistryAddress: "0x9066C02cAf7A60a905b094Fb8c773441f5693569",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Sepolia
  {
    chainId: "11155111" as CHAIN_ID,
    documentStoreAddress: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
    tokenRegistryAddress: "0x8280a08a3D6C8567e5Ad867F3c4d36F286767606",
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
  // Hedera Testnet
  {
    chainId: "296" as CHAIN_ID,
    documentStoreAddress: "0x93092C2B449712281008112870063fF439367C00",
    tokenRegistryAddress: "",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Amoy
  {
    chainId: "80002" as CHAIN_ID,
    documentStoreAddress: "0x93092C2B449712281008112870063fF439367C00",
    tokenRegistryAddress: "0x3652EfBc80aCE560844AFC932D2bf8b452A96c6d",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
  // Astron
  {
    chainId: "1338" as CHAIN_ID,
    documentStoreAddress: "0xA594f6e10564e87888425c7CC3910FE1c800aB0B",
    tokenRegistryAddress: "",
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
];
