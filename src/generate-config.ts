import fs from "fs";
import path from "path";
import configSchema from "./config.schema.json";
import { configFile } from "./examples/config-file";
import { validateConfig } from "./helpers/validate-config";
// import wallet from "./common/wallet.json";
// import { getUpdateForms } from "@govtechsg/open-attestation-cli/src/implementations/config/helpers";

// const DOCUMENT_STORE_ADDRESS = "0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca";
// const TOKEN_REGISTRY_ADDRESS = "0x72d9a82203Ef9177239A5E3cB7A8FB9a78D04f17";
// const DNS_VERIFIABLE = "demo-tradetrust.openattestation.com";
// const DNS_TRANSFERABLE_RECORD = "demo-tradetrust.openattestation.com";
// const DNS_DID = "demo-tradetrust.openattestation.com";

const DIR = path.join(__dirname, "../build");

const generateConfig = async () => {
  try {
    // const { forms } = configFile;
    // const updatedForms = getUpdateForms({
    //   walletAddress: wallet.address,
    //   forms,
    //   documentStoreAddress: DOCUMENT_STORE_ADDRESS,
    //   tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
    //   dnsVerifiable: DNS_VERIFIABLE,
    //   dnsDid: DNS_TRANSFERABLE_RECORD,
    //   dnsTransferableRecord: DNS_DID,
    // });
    // const updatedConfigFile = {
    //   ...configFile,
    //   forms: updatedForms,
    // };

    validateConfig(configSchema, configFile);

    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR);
    }

    fs.writeFile(
      `${DIR}/config-sample.json`,
      JSON.stringify(configFile, null, 2),
      (err: any) => {
        if (err) throw err;
        console.info("The sample config file has been saved!");
      },
    );
  } catch (err) {
    console.error(err);
  }
};

generateConfig();
