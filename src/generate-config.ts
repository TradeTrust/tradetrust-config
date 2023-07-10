import fs from "fs";
import path from "path";
import configSchemaV2 from "./config-v2.schema.json";
import configSchemaV3 from "./config-v3.schema.json";
import { configFileV2, configFileV3 } from "./examples/config-file";
import { walletLocal, walletSample } from "./examples/wallet";
import { getUpdatedConfigV2, getUpdatedConfigV3 } from "./helpers/helpers";
import { ConfigFileWithFormV2, ConfigFileWithFormV3 } from "./types";
import {
  CHAIN_ID,
  SUPPORTED_CHAINS,
} from "@govtechsg/tradetrust-utils/constants/supportedChains";
import { validateConfig } from "./utils/utils";

const DIR = path.join(__dirname, "../build");

// addresses exists as txt-records in respective domains
const buildData = [
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

const writeConfigFile = (
  configFile: ConfigFileWithFormV2 | ConfigFileWithFormV3,
  file: string,
) => {
  fs.writeFile(file, JSON.stringify(configFile, null, 2), (err: any) => {
    if (err) throw err;
    console.info(`The ${file} has been saved!`);
  });
};

const writeReferences = () => {
  const DIR_REFERENCE = `${DIR}/reference`;

  if (!fs.existsSync(DIR_REFERENCE)) {
    fs.mkdirSync(DIR_REFERENCE, { recursive: true });
  }

  writeConfigFile(configFileV2, `${DIR_REFERENCE}/config-v2.json`);
  writeConfigFile(configFileV3, `${DIR_REFERENCE}/config-v3.json`);
};

const writeSamples = () => {
  buildData.forEach((data) => {
    const {
      chainId,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    } = data;
    const DIR_NETWORK = `${DIR}/${SUPPORTED_CHAINS[chainId].name}`;
    const wallet = chainId === "1337" ? walletLocal : walletSample;

    if (!fs.existsSync(DIR_NETWORK)) {
      fs.mkdirSync(DIR_NETWORK);
    }

    const updatedConfigV2 = getUpdatedConfigV2({
      chainId,
      wallet,
      configFile: configFileV2,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });

    const updatedConfigV3 = getUpdatedConfigV3({
      chainId,
      wallet,
      configFile: configFileV3,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });

    validateConfig(configSchemaV2, updatedConfigV2);
    validateConfig(configSchemaV3, updatedConfigV3);

    writeConfigFile(updatedConfigV2, `${DIR_NETWORK}/config-v2.json`);
    writeConfigFile(updatedConfigV3, `${DIR_NETWORK}/config-v3.json`);
  });
};

const generateConfig = async () => {
  try {
    writeReferences();
    writeSamples();
  } catch (err) {
    console.error(err);
  }
};

generateConfig();
