import {
  ConfigFile,
  GetUpdatedConfigFile,
  Form,
  WalletConfig,
} from "../types/types";

const getWalletAddress = (wallet: WalletConfig) => {
  if (wallet.type === "ENCRYPTED_JSON") {
    const { encryptedJson } = wallet;
    const { address } = JSON.parse(encryptedJson);
    return address;
  }
  throw new Error("Unable to get wallet address");
};

export const getUpdatedConfigV2 = ({
  wallet,
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: GetUpdatedConfigFile): ConfigFile => {
  const walletAddress = getWalletAddress(wallet);
  const { forms } = configFile;

  const updatedForms = forms.map((form: Form) => {
    if (form.type === "VERIFIABLE_DOCUMENT") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const updatedIssuers = form.defaults.issuers.map((issuer) => {
        if (issuer.identityProof) {
          if (issuer.identityProof.type === "DNS-TXT") {
            issuer.documentStore = documentStoreAddress;
            issuer.identityProof.location = dnsVerifiable;
          } else if (
            issuer.identityProof.type === "DID" ||
            issuer.identityProof.type === "DNS-DID"
          ) {
            issuer.id = `did:ethr:0x${walletAddress}`;
            issuer.identityProof.key = `did:ethr:0x${walletAddress}#controller`;

            if (issuer.identityProof.type === "DNS-DID") {
              issuer.identityProof.location = dnsDid;
            }
            if (issuer.revocation) {
              issuer.revocation.type = "NONE";
            }
          }
        }
        return issuer;
      });
      form.defaults.issuers = updatedIssuers;
    }

    if (form.type === "TRANSFERABLE_RECORD") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const updatedIssuers = form.defaults.issuers.map((issuer) => {
        issuer.tokenRegistry = tokenRegistryAddress;
        if (issuer.identityProof) {
          issuer.identityProof.location = dnsTransferableRecord;
        }
        return issuer;
      });
      form.defaults.issuers = updatedIssuers;
    }

    return form;
  });

  return {
    ...configFile,
    wallet,
    forms: updatedForms,
  };
};

export const getUpdatedConfigV3 = ({
  wallet,
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: GetUpdatedConfigFile): ConfigFile => {
  const walletAddress = getWalletAddress(wallet);
  const { forms } = configFile;

  const updatedForms = forms.map((form: Form) => {
    if (form.type === "VERIFIABLE_DOCUMENT") {
      if (
        form.defaults.openAttestationMetadata.proof.method === "DOCUMENT_STORE"
      ) {
        form.defaults.openAttestationMetadata.proof.value =
          documentStoreAddress;
      } else if (form.defaults.openAttestationMetadata.proof.method === "DID") {
        form.defaults.openAttestationMetadata.proof.value = `did:ethr:0x${walletAddress}`;
      }

      if (
        form.defaults.openAttestationMetadata.identityProof.type === "DNS-TXT"
      ) {
        form.defaults.openAttestationMetadata.identityProof.identifier =
          dnsVerifiable;
      } else if (
        form.defaults.openAttestationMetadata.identityProof.type === "DID" ||
        form.defaults.openAttestationMetadata.identityProof.type === "DNS-DID"
      ) {
        form.defaults.openAttestationMetadata.identityProof.identifier = dnsDid;
      }
    }

    if (form.type === "TRANSFERABLE_RECORD") {
      form.defaults.openAttestationMetadata.proof.value = tokenRegistryAddress;
      form.defaults.openAttestationMetadata.identityProof.identifier =
        dnsTransferableRecord;
    }

    return form;
  });

  return {
    ...configFile,
    wallet,
    forms: updatedForms,
  };
};
