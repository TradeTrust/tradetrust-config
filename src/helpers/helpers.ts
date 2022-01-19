import {
  ConfigFileWithFormV2,
  ConfigFileWithFormV3,
  GetUpdatedConfigFileWithFormV2,
  GetUpdatedConfigFileWithFormV3,
  FormV2,
  FormV3,
  Wallet,
} from "../types";

const getWalletAddress = (wallet: Wallet) => {
  if (wallet.type === "ENCRYPTED_JSON") {
    const { encryptedJson } = wallet;
    const { address } = JSON.parse(encryptedJson);
    return address;
  }
  throw new Error("Unable to get wallet address");
};

export const getUpdatedConfigV2 = ({
  network,
  wallet,
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: GetUpdatedConfigFileWithFormV2): ConfigFileWithFormV2 => {
  const walletAddress = getWalletAddress(wallet);
  const { forms } = configFile;

  const updatedForms = forms.map((form: FormV2) => {
    if (form.type === "VERIFIABLE_DOCUMENT") {
      const updatedIssuers = form.defaults.issuers.map((issuer) => {
        if (issuer.identityProof) {
          if (issuer.identityProof.type === "DNS-TXT") {
            issuer.documentStore = documentStoreAddress;
            issuer.identityProof.location = dnsVerifiable;
          } else if (
            issuer.identityProof.type === "DNS-DID" ||
            issuer.identityProof.type === "DID"
          ) {
            issuer.id = `did:ethr:0x${walletAddress}`;
            issuer.identityProof.key = `did:ethr:0x${walletAddress}#controller`;

            if (issuer.identityProof.type === "DNS-DID") {
              issuer.identityProof.location = dnsDid;
            }
            // // creator does not have DID only handling yet + recomendation is to use DNS-DID
            // else if (issuer.identityProof.type === "DID") {
            //   delete issuer.identityProof.location;
            // }
          }
        }
        return issuer;
      });
      form.defaults.issuers = updatedIssuers;
    }

    if (form.type === "TRANSFERABLE_RECORD") {
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
    network,
    wallet,
    forms: updatedForms,
  };
};

export const getUpdatedConfigV3 = ({
  network,
  wallet,
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: GetUpdatedConfigFileWithFormV3): ConfigFileWithFormV3 => {
  const walletAddress = getWalletAddress(wallet);
  const { forms } = configFile;

  const updatedForms = forms.map((form: FormV3) => {
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
        form.defaults.openAttestationMetadata.identityProof.type === "DNS-DID"
      ) {
        form.defaults.openAttestationMetadata.identityProof.identifier = dnsDid;
      }
      // // creator does not have DID only handling yet + recomendation is to use DNS-DID
      // else if (
      //   form.defaults.openAttestationMetadata.identityProof.type === "DID"
      // ) {
      //   form.defaults.openAttestationMetadata.identityProof.identifier = `did:ethr:0x${walletAddress}`;
      // }
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
    network,
    wallet,
    forms: updatedForms,
  };
};
