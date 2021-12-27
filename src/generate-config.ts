import fs from "fs";
import path from "path";
import configSchemaV2 from "./config-v2.schema.json";
import configSchemaV3 from "./config-v3.schema.json";
import { walletSample } from "./examples/wallet";
import { configFileV2, configFileV3 } from "./examples/config-file";
import { getUpdatedConfigV2, getUpdatedConfigV3 } from "./helpers/helpers";
import { validateConfig } from "./utils/utils";
import { ConfigFile } from "./types/types";

const DIR = path.join(__dirname, "../build");

// addresses exists as txt-records in respective domains
const buildData = [
  {
    network: "ropsten",
    documentStoreAddress: "0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca",
    tokenRegistryAddress: "0x72d9a82203Ef9177239A5E3cB7A8FB9a78D04f17",
    dnsVerifiable: "demo-tradetrust.openattestation.com",
    dnsTransferableRecord: "demo-tradetrust.openattestation.com",
    dnsDid: "demo-tradetrust.openattestation.com",
  },
  {
    network: "rinkeby",
    documentStoreAddress: "0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca",
    tokenRegistryAddress: "0x26E730520949F9B2F73b53A35044680c2165725D",
    dnsVerifiable: "demo-tradetrust.openattestation.com",
    dnsTransferableRecord: "demo-tradetrust.openattestation.com",
    dnsDid: "demo-tradetrust.openattestation.com",
  },
];

const writeConfigFile = (configFile: ConfigFile, file: string) => {
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

    if (!fs.existsSync(DIR_NETWORK)) {
      fs.mkdirSync(DIR_NETWORK);
    }

    const updatedConfigV2 = getUpdatedConfigV2({
      wallet: walletSample,
      configFile: configFileV2,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });

    const updatedConfigV3 = getUpdatedConfigV3({
      wallet: walletSample,
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
