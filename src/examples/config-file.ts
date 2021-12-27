import { v2 } from "@govtechsg/open-attestation";
import { TemplateType } from "@govtechsg/open-attestation/dist/types/__generated__/schema.2.0";
import {
  ProofType,
  Method,
  IdentityProofType,
} from "@govtechsg/open-attestation/dist/types/__generated__/schema.3.0";
import { walletReference } from "./wallet";
import { formsV2, formsV3 } from "./forms";
import { ConfigFileWithFormV2, ConfigFileWithFormV3 } from "../types/types";

export const configFileV2: ConfigFileWithFormV2 = {
  network: "ropsten",
  wallet: walletReference,
  // documentStorage: {
  //   apiKey: "randomKey",
  //   url: "https://api-ropsten.tradetrust.io/storage",
  // }, // omiting documentStorage first, only after DID handling at oa-functions is solved
  forms: [...formsV2],
};

export const configFileV3: ConfigFileWithFormV3 = {
  network: "ropsten",
  wallet: walletReference,
  // documentStorage: {
  //   apiKey: "randomKey",
  //   url: "https://api-ropsten.tradetrust.io/storage",
  // }, // omiting documentStorage first, only after DID handling at oa-functions is solved
  forms: [...formsV3],
};

export const ConfigMinimumExampleV2: ConfigFileWithFormV2 = {
  network: "ropsten",
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
              type: "DNS-TXT" as v2.IdentityProofType.DNSTxt,
              location: "foobar.xyz",
            },
            revocation: {
              type: "NONE" as v2.RevocationType.None,
            },
          },
        ],
      },
      schema: {},
      uiSchema: {},
    },
  ],
};

export const ConfigMinimumExampleV3: ConfigFileWithFormV3 = {
  network: "ropsten",
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
          },
          identityProof: {
            type: "DNS-TXT" as IdentityProofType.DNSTxt,
            identifier: "foobar.xyz",
          },
        },
        issuer: {
          id: "https://example.com",
          name: "DEMO STORE",
        },
        credentialSubject: {},
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
