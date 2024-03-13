import { CHAIN_ID } from "@tradetrust-tt/tradetrust-utils/constants/supportedChains";

// addresses exists as txt-records in respective domains
export const buildData = [
  {
    chainId: "20180427" as CHAIN_ID,
    documentStoreAddress: "0x69E29FA634573BB6b82C01b3FEA3B704488bd853",
    tokenRegistryAddress: "0x3d23649EB097fa729A8e1e15Fdb37680Caf766F7",
    dnsVerifiable: "tradetrust-testnet.stabilityprotocol.com",
    dnsTransferableRecord: "tradetrust-testnet.stabilityprotocol.com",
    dnsDid: "tradetrust-testnet.stabilityprotocol.com",
  },
  {
    chainId: "101010" as CHAIN_ID,
    documentStoreAddress: "0xB3601037855017C8a4d2188C9097C056dd1eDAA6",
    tokenRegistryAddress: "0x03f9950d6cd37a6040834aded3f47a4755983f53",
    dnsVerifiable: "tradetrust-gtn.stabilityprotocol.com",
    dnsTransferableRecord: "tradetrust-gtn.stabilityprotocol.com",
    dnsDid: "tradetrust-gtn.stabilityprotocol.com",
  },
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
  {
    chainId: "296" as CHAIN_ID,
    documentStoreAddress: "0x222B69788e2e9B7FB93a3a0fE258D4604Dc7df21",
    tokenRegistryAddress: "0x3DE43bfd3D771931E46CbBd4EDE0D3d95C85f81A",
    dnsVerifiable: "trustlv.org",
    dnsTransferableRecord: "trustlv.org",
    dnsDid: "trustlv.org",
  },
];
