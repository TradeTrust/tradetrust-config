import fs from "fs";
import path from "path";
import configSchemaV2 from "./config-v2.schema.json";
import configSchemaV3 from "./config-v3.schema.json";
import { configFileV2, configFileV3 } from "./examples/config-file";
import { walletLocal, walletSample, walletApothem } from "./examples/wallet";
import { getUpdatedConfigV2, getUpdatedConfigV3 } from "./helpers/helpers";
import { ConfigFileWithFormV2, ConfigFileWithFormV3 } from "./types";
import {
  SUPPORTED_CHAINS,
  CHAIN_ID,
} from "@tradetrust-tt/tradetrust-utils/constants/supportedChains";
import { validateConfig } from "./utils/utils";
import { buildData } from "./constants";
const DIR = path.join(__dirname, "../build");

const writeConfigFile = (
  configFile: ConfigFileWithFormV2 | ConfigFileWithFormV3,
  file: string
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
    let wallet;

    switch (chainId) {
      case CHAIN_ID.local:
        wallet = walletLocal;
        break;
      case CHAIN_ID.xdcapothem:
        wallet = walletApothem;
        break;
      case CHAIN_ID.maticmum:
      case CHAIN_ID.amoy:
      case CHAIN_ID.sepolia:
      case CHAIN_ID.hederatestnet:
      case CHAIN_ID.stabilitytestnet:
      case CHAIN_ID.stability:
        wallet = walletSample;
        break;
    }
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
