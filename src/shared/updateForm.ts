import { networkCurrency } from "@tradetrust-tt/tradetrust-utils/constants/network";
import { CHAIN_ID } from "@tradetrust-tt/tradetrust-utils/constants/supportedChains";

type WalletEncryptedJson = {
  type: "ENCRYPTED_JSON";
  encryptedJson: string;
};

type WalletAws = {
  type: "AWS_KMS";
  accessKeyId: string;
  region: string;
  kmsKeyId: string;
};

type Wallet = WalletEncryptedJson | WalletAws;

interface UpdateForm {
  chain: {
    currency: networkCurrency;
    id: CHAIN_ID;
  };
  wallet: Wallet;
  form: any;
  documentStoreAddress: string;
  tokenRegistryAddress: string;
  dnsVerifiable: string;
  dnsDid: string;
  dnsTransferableRecord: string;
}

export const updateFormV2 = ({
  chain,
  wallet,
  form,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: UpdateForm) => {
  const { encryptedJson } = wallet as WalletEncryptedJson;
  const { address } = JSON.parse(encryptedJson);

  if (form.type === "VERIFIABLE_DOCUMENT") {
    const updatedIssuers = form.defaults.issuers.map((issuer: any) => {
      if (issuer.identityProof) {
        if (issuer.identityProof.type === "DNS-TXT") {
          issuer.documentStore = documentStoreAddress;
          issuer.identityProof.location = dnsVerifiable;
        } else if (
          issuer.identityProof.type === "DNS-DID" ||
          issuer.identityProof.type === "DID"
        ) {
          issuer.id = `did:ethr:0x${address}`;
          issuer.identityProof.key = `did:ethr:0x${address}#controller`;

          if (issuer.identityProof.type === "DNS-DID") {
            issuer.identityProof.location = dnsDid;
          } else if (issuer.identityProof.type === "DID") {
            delete issuer.identityProof.location;
          }
        }
      }
      return issuer;
    });
    form.defaults.issuers = updatedIssuers;
  }

  if (form.type === "TRANSFERABLE_RECORD") {
    const updatedIssuers = form.defaults.issuers.map((issuer: any) => {
      issuer.tokenRegistry = tokenRegistryAddress;
      if (issuer.identityProof) {
        issuer.identityProof.location = dnsTransferableRecord;
      }
      return issuer;
    });
    form.defaults.issuers = updatedIssuers;
  }

  form.defaults.network = {
    chain: chain.currency,
    chainId: chain.id,
  };

  return form;
};

export const updateFormV3 = ({
  chain,
  wallet,
  form,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: UpdateForm) => {
  const { encryptedJson } = wallet as WalletEncryptedJson;
  const { address } = JSON.parse(encryptedJson);

  if (form.type === "VERIFIABLE_DOCUMENT") {
    if (
      form.defaults.openAttestationMetadata.proof.method === "DOCUMENT_STORE"
    ) {
      form.defaults.openAttestationMetadata.proof.value = documentStoreAddress;
    } else if (form.defaults.openAttestationMetadata.proof.method === "DID") {
      form.defaults.openAttestationMetadata.proof.value = `did:ethr:0x${address}`;
    }

    if (
      form.defaults.openAttestationMetadata.identityProof.type === "DNS-TXT"
    ) {
      form.defaults.openAttestationMetadata.identityProof.identifier =
        dnsVerifiable;
    } else if (
      form.defaults.openAttestationMetadata.identityProof.type === "DNS-DID"
    ) {
      form.defaults.openAttestationMetadata.identityProof.identifier = dnsDid;
    } else if (
      form.defaults.openAttestationMetadata.identityProof.type === "DID"
    ) {
      form.defaults.openAttestationMetadata.identityProof.identifier = `did:ethr:0x${address}`;
    }
  }

  if (form.type === "TRANSFERABLE_RECORD") {
    form.defaults.openAttestationMetadata.proof.value = tokenRegistryAddress;
    form.defaults.openAttestationMetadata.identityProof.identifier =
      dnsTransferableRecord;
  }

  form.defaults.network = {
    chain: chain.currency,
    chainId: chain.id,
  };

  return form;
};

export const updateFormV4 = ({
  chain,
  wallet,
  form,
  documentStoreAddress,
  tokenRegistryAddress,
}: UpdateForm) => {
  const { encryptedJson } = wallet as WalletEncryptedJson;
  const { address } = JSON.parse(encryptedJson);

  if (form.type === "TRANSFERABLE_RECORD") {
    form.defaults.credentialStatus.location = tokenRegistryAddress;   
  } else if (form.type === "VERIFIABLE_DOCUMENT") {
    form.defaults.credentialStatus.location = documentStoreAddress;
  }
  
  form.defaults.issuer.id = `did:ethr:0x${address}`;

  form.defaults.network = {
    chain: chain.currency,
    chainId: chain.id,
  };

  return form;
};