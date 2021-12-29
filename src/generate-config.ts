import fs from "fs";
import path from "path";
import configSchemaV2 from "./config-v2.schema.json";
import configSchemaV3 from "./config-v3.schema.json";
import { walletSample, walletLocal } from "./examples/wallet";
import { configFileV2, configFileV3 } from "./examples/config-file";
import { getUpdatedConfigV2, getUpdatedConfigV3 } from "./helpers/helpers";
import { validateConfig } from "./utils/utils";
import { Network, ConfigFileWithFormV2, ConfigFileWithFormV3 } from "./types";

const DIR = path.join(__dirname, "../build");

// addresses exists as txt-records in respective domains
const buildData = [
  {
    network: "ropsten" as Network,
    documentStoreAddress: "0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca",
    tokenRegistryAddress: "0x72d9a82203Ef9177239A5E3cB7A8FB9a78D04f17",
    dnsVerifiable: "demo-tradetrust.openattestation.com",
    dnsTransferableRecord: "demo-tradetrust.openattestation.com",
    dnsDid: "demo-tradetrust.openattestation.com",
  },
  {
    network: "rinkeby" as Network,
    documentStoreAddress: "0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca",
    tokenRegistryAddress: "0x26E730520949F9B2F73b53A35044680c2165725D",
    dnsVerifiable: "demo-tradetrust.openattestation.com",
    dnsTransferableRecord: "demo-tradetrust.openattestation.com",
    dnsDid: "demo-tradetrust.openattestation.com",
  },
  {
    network: "local" as Network, // local network will skip dns verifier
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
      network,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    } = data;
    const DIR_NETWORK = `${DIR}/${network}`;
    const wallet = network === "local" ? walletLocal : walletSample;

    if (!fs.existsSync(DIR_NETWORK)) {
      fs.mkdirSync(DIR_NETWORK);
    }

    const updatedConfigV2 = getUpdatedConfigV2({
      network,
      wallet,
      configFile: configFileV2,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });

    const updatedConfigV3 = getUpdatedConfigV3({
      network,
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
