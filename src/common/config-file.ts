import path from "path";
import wallet from "./wallet.json";
import { getForms } from "./utils";

const dirFormsV2 = path.join(__dirname, "../../fixtures/config/forms/v2");
const documentFormsV2 = getForms(dirFormsV2);

const walletConfig = {
  type: "ENCRYPTED_JSON",
  encryptedJson: JSON.stringify(wallet),
};

export const configFile = {
  network: "ropsten",
  wallet: walletConfig,
  documentStorage: {
    apiKey: "randomKey",
    url: "https://api-ropsten.tradetrust.io/storage",
  },
  forms: [...documentFormsV2],
};

export const ConfigMinimumExample = {
  network: "ropsten",
  wallet: "123",
  forms: [
    {
      name: "Foobar",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {
        $template: {
          type: "EMBEDDED_RENDERER",
          name: "INVOICE",
          url: "https://example.com",
        },
        issuers: [
          {
            name: "Hello world",
            documentStore: "0x123",
            identityProof: {
              type: "DNS-TXT",
              location: "xyz",
            },
          },
        ],
      },
      schema: {},
      uiSchema: {},
    },
  ],
};

export const ErrorNoWallet = {
  ...ConfigMinimumExample,
  wallet: "",
};

export const ErrorUri = {
  ...ConfigMinimumExample,
  documentStorage: {
    apiKey: "randomKey",
    url: "123", // handles "format": "uri"
  },
};

export const ErrorHostname = {
  ...ConfigMinimumExample,
  forms: [
    {
      ...ConfigMinimumExample.forms[0],
      defaults: {
        ...ConfigMinimumExample.forms[0].defaults,
        issuers: [
          {
            ...ConfigMinimumExample.forms[0].defaults.issuers[0],
            identityProof: {
              type: "DNS-TXT",
              location: "https://example.com", // handles "format": "hostname"
            },
          },
        ],
      },
    },
  ],
};
