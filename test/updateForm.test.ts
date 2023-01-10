import { CHAIN_ID } from "@govtechsg/tradetrust-utils/constants/supportedChains";
import { Wallet } from "ethers";
import { updateFormV2, updateFormV3 } from "../src/shared/updateForm";
import v2VerifiableDocumentForm from "../fixtures/config/forms/v2/invoice.json";
import v2DnsDidForm from "../fixtures/config/forms/v2/invoice-dns-did.json";
import v2TransferableRecordForm from "../fixtures/config/forms/v2/bill-of-lading.json";
import v3VerifiableDocumentForm from "../fixtures/config/forms/v3/invoice.json";
import v3DnsDidForm from "../fixtures/config/forms/v3/invoice-dns-did.json";
import v3TransferableRecordForm from "../fixtures/config/forms/v3/bill-of-lading.json";

const v2DidForm = {
  name: "A DID Verifiable Document Form",
  type: "VERIFIABLE_DOCUMENT",
  defaults: {
    $template: {
      type: "EMBEDDED_RENDERER",
      name: "CHAFTA_COO",
      url: "https://generic-templates.openattestation.io",
    },
    issuers: [
      {
        id: "did:ethr:0x123123123123123123123123123123123123",
        name: "DEMO DID",
        revocation: {
          type: "NONE",
        },
        identityProof: {
          type: "DID",
          key: "did:ethr:0x123123123123123123123123123123123123#controller",
          location: "demo-oa.openattestation.com",
        },
      },
    ],
  },
}; // putting directly here instead of fixtures, as we don't want to provide any `DID` forms during `npm run build`

const v3DidForm = {
  name: "A V3 DID Verifiable Document Form",
  type: "VERIFIABLE_DOCUMENT",
  defaults: {
    version: "https://schema.openattestation.com/3.0/schema.json",
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json",
    ],
    type: ["VerifiableCredential", "OpenAttestationCredential"],
    issuanceDate: "2010-01-01T19:23:24Z",
    openAttestationMetadata: {
      template: {
        type: "EMBEDDED_RENDERER",
        name: "CHAFTA_COO",
        url: "https://generic-templates.oa.io",
      },
      proof: {
        type: "OpenAttestationProofMethod",
        method: "DID",
        value: "did:ethr:0x123",
        revocation: {
          type: "NONE",
        },
      },
      identityProof: {
        type: "DID",
        identifier: "demo-oa.openattestation.com",
      },
    },
    credentialSubject: {},
    issuer: {
      id: "https://example.com",
      name: "DEMO DID",
      type: "OpenAttestationIssuer",
    },
  },
}; // putting directly here instead of fixtures, as we don't want to provide any `DID` forms during `npm run build`

describe("updateFormV2", () => {
  const wallet = Wallet.fromMnemonic(
    "tourist quality multiply denial diary height funny calm disease buddy speed gold",
  );
  const walletString = JSON.stringify(wallet);

  it("should update the form from a verifiable document correctly", () => {
    const updatedForm = updateFormV2({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v2VerifiableDocumentForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });
    expect(
      updatedForm.defaults.issuers[0].identityProof.location,
    ).toStrictEqual("VerifiableDNS.com");
    expect(updatedForm.defaults.issuers[0].documentStore).toStrictEqual(
      "0xabcDocumentStore",
    );
  });

  it("should update the form from a DID verifiable document correctly", () => {
    const updatedForm = updateFormV2({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v2DidForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });

    expect(updatedForm.defaults.issuers[0].id).toStrictEqual(
      "did:ethr:0x0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C",
    );
    expect(updatedForm.defaults.issuers[0].identityProof.key).toStrictEqual(
      "did:ethr:0x0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C#controller",
    );
    expect(
      updatedForm.defaults.issuers[0].identityProof.location,
    ).toStrictEqual(undefined);
  });

  it("should update the form from a DNS-DID verifiable document correctly", () => {
    const updatedForm = updateFormV2({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v2DnsDidForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });
    expect(updatedForm.defaults.issuers[0].id).toStrictEqual(
      "did:ethr:0x0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C",
    );
    expect(updatedForm.defaults.issuers[0].identityProof.key).toStrictEqual(
      "did:ethr:0x0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C#controller",
    );
    expect(
      updatedForm.defaults.issuers[0].identityProof.location,
    ).toStrictEqual("DNSDID.com");
  });

  it("should update the form from a transferable document correctly", () => {
    const updatedForm = updateFormV2({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v2TransferableRecordForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });
    expect(
      updatedForm.defaults.issuers[0].identityProof.location,
    ).toStrictEqual("TransferableDNS.com");
    expect(updatedForm.defaults.issuers[0].tokenRegistry).toStrictEqual(
      "0xabcTokenRegistry",
    );
  });
});

describe("updateFormV3", () => {
  const wallet = Wallet.fromMnemonic(
    "tourist quality multiply denial diary height funny calm disease buddy speed gold",
  );
  const walletString = JSON.stringify(wallet);

  it("should update the form from a verifiable document correctly", () => {
    const updatedForm = updateFormV3({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v3VerifiableDocumentForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });
    expect(
      updatedForm.defaults.openAttestationMetadata.identityProof.identifier,
    ).toStrictEqual("VerifiableDNS.com");
    expect(
      updatedForm.defaults.openAttestationMetadata.proof.value,
    ).toStrictEqual("0xabcDocumentStore");
  });

  it("should update the form from a DID verifiable document correctly", () => {
    const updatedForm = updateFormV3({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v3DidForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });
    expect(
      updatedForm.defaults.openAttestationMetadata.proof.value,
    ).toStrictEqual("did:ethr:0x0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C");
    expect(
      updatedForm.defaults.openAttestationMetadata.identityProof.identifier,
    ).toStrictEqual("did:ethr:0x0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C");
  });

  it("should update the form from a DNS-DID verifiable document correctly", () => {
    const updatedForm = updateFormV3({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v3DnsDidForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });
    expect(
      updatedForm.defaults.openAttestationMetadata.proof.value,
    ).toStrictEqual("did:ethr:0x0x906FB815De8976b1e38D9a4C1014a3acE16Ce53C");
    expect(
      updatedForm.defaults.openAttestationMetadata.identityProof.identifier,
    ).toStrictEqual("DNSDID.com");
  });

  it("should update the form from a transferable document correctly", () => {
    const updatedForm = updateFormV3({
      chain: { currency: "ETH", id: CHAIN_ID.goerli },
      wallet: { type: "ENCRYPTED_JSON", encryptedJson: walletString },
      form: v3TransferableRecordForm,
      documentStoreAddress: "0xabcDocumentStore",
      tokenRegistryAddress: "0xabcTokenRegistry",
      dnsVerifiable: "VerifiableDNS.com",
      dnsDid: "DNSDID.com",
      dnsTransferableRecord: "TransferableDNS.com",
    });
    expect(
      updatedForm.defaults.openAttestationMetadata.identityProof.identifier,
    ).toStrictEqual("TransferableDNS.com");
    expect(
      updatedForm.defaults.openAttestationMetadata.proof.value,
    ).toStrictEqual("0xabcTokenRegistry");
  });
});
