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
    documentStoreAddress: "0xDAcbd662C0cC48797e490eEd946b6D8b414c52B0",
    tokenRegistryAddress: "0x4E945Eb5A2FF89AE6f2f828e283aEf1fB657DC59",
    dnsVerifiable: "demo-tradetrust.openattestation.com",
    dnsTransferableRecord: "demo-tradetrust.openattestation.com",
    dnsDid: "demo-tradetrust.openattestation.com",
  },
  {
    chainId: "5" as CHAIN_ID,
    documentStoreAddress: "0x49b2969bF0E4aa822023a9eA2293b24E4518C1DD",
    tokenRegistryAddress: "0x921dC7cEF00155ac3A33f04DA7395324d7809757",
    dnsVerifiable: "demo-tradetrust.openattestation.com",
    dnsTransferableRecord: "demo-tradetrust.openattestation.com",
    dnsDid: "demo-tradetrust.openattestation.com",
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
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  writeConfigFile(configFileV2, `${DIR}/config-reference-v2.json`);
  writeConfigFile(configFileV3, `${DIR}/config-reference-v3.json`);
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

    writeConfigFile(updatedConfigV2, `${DIR_NETWORK}/config-v2.json`);
    writeConfigFile(updatedConfigV3, `${DIR_NETWORK}/config-v3.json`);
  });
};

const generateConfig = async () => {
  try {
    validateConfig(configSchemaV2, configFileV2);
    validateConfig(configSchemaV3, configFileV3);

    writeReferences();
    writeSamples();
  } catch (err) {
    console.error(err);
  }
};

generateConfig();
