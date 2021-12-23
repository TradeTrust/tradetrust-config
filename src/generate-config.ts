import fs from "fs";
import path from "path";
import configSchemaV2 from "./config-v2.schema.json";
import configSchemaV3 from "./config-v3.schema.json";
import { configFileV2, configFileV3 } from "./examples/config-file";
import {
  validateConfig,
  getConfigWithUpdatedFormsV2,
  getConfigWithUpdatedFormsV3,
} from "./helpers/helpers";

const DOCUMENT_STORE_ADDRESS = "0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca";
const TOKEN_REGISTRY_ADDRESS = "0x72d9a82203Ef9177239A5E3cB7A8FB9a78D04f17";
const DNS_VERIFIABLE = "demo-tradetrust.openattestation.com";
const DNS_TRANSFERABLE_RECORD = "demo-tradetrust.openattestation.com";
const DNS_DID = "demo-tradetrust.openattestation.com";

const DIR = path.join(__dirname, "../build");

const writeConfigFile = (configFile: any, fileName: string) => {
  fs.writeFile(
    `${DIR}/${fileName}.json`,
    JSON.stringify(configFile, null, 2),
    (err: any) => {
      if (err) throw err;
      console.info(`The ${fileName} has been saved!`);
    },
  );
};

const generateConfig = async () => {
  try {
    validateConfig(configSchemaV2, configFileV2);
    validateConfig(configSchemaV3, configFileV3);

    const updatedConfigV2 = getConfigWithUpdatedFormsV2({
      configFile: configFileV2,
      documentStoreAddress: DOCUMENT_STORE_ADDRESS,
      tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
      dnsVerifiable: DNS_VERIFIABLE,
      dnsDid: DNS_TRANSFERABLE_RECORD,
      dnsTransferableRecord: DNS_DID,
    });

    const updatedConfigV3 = getConfigWithUpdatedFormsV3({
      configFile: configFileV3,
      documentStoreAddress: DOCUMENT_STORE_ADDRESS,
      tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
      dnsVerifiable: DNS_VERIFIABLE,
      dnsDid: DNS_TRANSFERABLE_RECORD,
      dnsTransferableRecord: DNS_DID,
    });

    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR);
    }

    writeConfigFile(updatedConfigV2, "config-sample-v2");
    writeConfigFile(updatedConfigV3, "config-sample-v3");
  } catch (err) {
    console.error(err);
  }
};

generateConfig();
