import {
  IdentityProofType as IdentityProofTypeV2,
  RevocationType as RevocationTypeV2,
  TemplateType,
} from "@tradetrust-tt/tradetrust/dist/types/__generated__/schema.2.0";
import {
  IdentityProofType as IdentityProofTypeV3,
  Method,
  ProofType,
  RevocationType as RevocationTypeV3,
} from "@tradetrust-tt/tradetrust/dist/types/__generated__/schema.3.0";
import { ConfigFileWithFormV2, ConfigFileWithFormV3 } from "../types";
import { formsV2, formsV3 } from "./forms";
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

export const ConfigMinimumExampleV2: ConfigFileWithFormV2 = {
  network: "sepolia",
  wallet: walletReference,
  forms: [
    {
      name: "Foobar",
      type: "VERIFIABLE_DOCUMENT",
      defaults: {
        $template: {
          type: "EMBEDDED_RENDERER" as TemplateType.EmbeddedRenderer,
          name: "INVOICE",
          url: "https://example.com",
        },
        issuers: [
          {
            name: "Hello world",
            documentStore: "0x123",
            identityProof: {
              type: "DNS-TXT" as IdentityProofTypeV2.DNSTxt,
              location: "foobar.xyz",
            },
            revocation: {
              type: "NONE" as RevocationTypeV2.None,
            },
          },
        ],
        network: {
          chain: "ETH",
          chainId: "5",
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
            type: "EMBEDDED_RENDERER" as TemplateType.EmbeddedRenderer,
            name: "INVOICE",
            url: "https://example.com",
          },
          proof: {
            type: "OpenAttestationProofMethod" as ProofType.OpenAttestationProofMethod,
            method: "DOCUMENT_STORE" as Method.DocumentStore,
            value: "123",
            revocation: {
              type: "NONE" as RevocationTypeV3.None,
            },
          },
          identityProof: {
            type: "DNS-TXT" as IdentityProofTypeV3.DNSTxt,
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
          chainId: "5",
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
              type: "DNS-TXT" as IdentityProofTypeV2.DNSTxt,
              location: "https://example.com", // handles "format": "hostname"
            },
          },
        ],
      },
    },
  ],
};
