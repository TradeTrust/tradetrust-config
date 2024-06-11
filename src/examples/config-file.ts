import { v2, v3, TTv4 } from "@tradetrust-tt/tradetrust";
import { ConfigFileWithFormV2, ConfigFileWithFormV3, ConfigFileWithFormV4 } from "../types";
import { formsV2, formsV3, formsV4 } from "./forms";
import { walletReference } from "./wallet";

export const configFileV2: ConfigFileWithFormV2 = {
  network: "sepolia",
  wallet: walletReference,
  documentStorage: {
    apiKey: "randomKey",
    url: "https://tradetrust-functions.netlify.app/.netlify/functions/storage",
  },
  forms: [...formsV2],
};

export const configFileV3: ConfigFileWithFormV3 = {
  network: "sepolia",
  wallet: walletReference,
  documentStorage: {
    apiKey: "randomKey",
    url: "https://tradetrust-functions.netlify.app/.netlify/functions/storage",
  },
  forms: [...formsV3],
};

export const configFileV4: ConfigFileWithFormV4 = {
  network: "sepolia",
  wallet: walletReference,
  // TODO: ADD BACK WHEN BETA IS RELEASED
  // documentStorage: {
  //   apiKey: "randomKey",
  //   url: "https://tradetrust-functions.netlify.app/.netlify/functions/storage",
  // },
  forms: [...formsV4],
};

export const ConfigMinimumExampleV2: ConfigFileWithFormV2 = {
  network: "sepolia",
  wallet: walletReference,
  forms: [
    {
      name: "Foobar",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {
        $template: {
          type: "EMBEDDED_RENDERER" as v2.TemplateType.EmbeddedRenderer,
          name: "INVOICE",
          url: "https://example.com",
        },
        issuers: [
          {
            name: "Hello world",
            documentStore: "0x123",
            identityProof: {
              type: "DNS-TXT" as v2.IdentityProofType.DNSTxt,
              location: "foobar.xyz",
            },
            revocation: {
              type: "NONE" as v2.RevocationType.None,
            },
          },
        ],
        network: {
          chain: "ETH",
          chainId: "11155111",
        },
      },
      schema: {},
      uiSchema: {},
    },
  ],
};

export const ConfigMinimumExampleV3: ConfigFileWithFormV3 = {
  network: "sepolia",
  wallet: walletReference,
  forms: [
    {
      name: "Foobar",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json",
          "https://example.com/1.0/foobar.json",
        ],
        type: ["VerifiableCredential", "OpenAttestationCredential"],
        issuanceDate: "2010-01-01T19:23:24Z",
        openAttestationMetadata: {
          template: {
            type: "EMBEDDED_RENDERER" as v3.TemplateType.EmbeddedRenderer,
            name: "INVOICE",
            url: "https://example.com",
          },
          proof: {
            type: "OpenAttestationProofMethod" as v3.ProofType.OpenAttestationProofMethod,
            method: "DOCUMENT_STORE" as v3.Method.DocumentStore,
            value: "123",
            revocation: {
              type: "NONE" as v3.RevocationType.None,
            },
          },
          identityProof: {
            type: "DNS-TXT" as v3.IdentityProofType.DNSTxt,
            identifier: "foobar.xyz",
          },
        },
        issuer: {
          id: "https://example.com",
          name: "DEMO STORE",
        },
        credentialSubject: {},
        network: {
          chain: "ETH",
          chainId: "11155111",
        },
      },
      schema: {},
      uiSchema: {},
    },
  ],
};

export const ConfigMinimumExampleV4: ConfigFileWithFormV4 = {
  network: "sepolia",
  wallet: walletReference,
  forms: [
    {
      name: "Foobar",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schemata.tradetrust.io/io/tradetrust/4.0/alpha-context.json"
        ],
        type: ["VerifiableCredential", "TradeTrustCredential"],
        issuer: {
          id: "https://example.com",
          identityProof: {
            identityProofType: TTv4.IdentityProofType.Idvc,
            identifier: "My Own Company Pte Ltd",
          },
        },
        credentialSubject: {},
        credentialStatus: {
          type: "TradeTrustCredentialStatus",
          credentialStatusType: TTv4.CredentialStatusType.RevocationStore,
        },
        network: {
          chain: "ETH",
          chainId: "11155111",
        },
      },
      schema: {},
      uiSchema: {},
    },
  ],
};

export const ErrorNoWallet = {
  ...ConfigMinimumExampleV2,
  wallet: "",
};

export const ErrorUri = {
  ...ConfigMinimumExampleV2,
  documentStorage: {
    apiKey: "randomKey",
    url: "123", // handles "format": "uri"
  },
};

export const ErrorHostname = {
  ...ConfigMinimumExampleV2,
  forms: [
    {
      ...ConfigMinimumExampleV2.forms[0],
      defaults: {
        ...ConfigMinimumExampleV2.forms[0].defaults,
        issuers: [
          {
            ...ConfigMinimumExampleV2.forms[0].defaults.issuers[0],
            identityProof: {
              type: "DNS-TXT" as v2.IdentityProofType.DNSTxt,
              location: "https://example.com", // handles "format": "hostname"
            },
          },
        ],
      },
    },
  ],
};
