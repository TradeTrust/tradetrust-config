import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateConfig = (configSchema: any, configFile: any) => {
  const validate = ajv.compile(configSchema);
  const valid = validate(configFile);
  if (!valid) {
    throw new Error(ajv.errorsText(validate.errors));
  }
};

const getWalletAddress = (configFile: any) => {
  const { wallet } = configFile;
  const { encryptedJson } = wallet;
  const { address } = JSON.parse(encryptedJson);
  return address;
};

// type any and ignore first
export const getConfigWithUpdatedFormsV2 = ({
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: any): any => {
  const { forms } = configFile;
  const walletAddress = getWalletAddress(configFile);

  const updatedForms = forms.map((form: any) => {
    if (form.type === "VERIFIABLE_DOCUMENT") {
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
            issuer.identityProof.location = dnsDid;
            issuer.identityProof.key = `did:ethr:0x${walletAddress}#controller`;
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
    forms: updatedForms,
  };
};

// type any and ignore first
export const getConfigWithUpdatedFormsV3 = ({
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: any): any => {
  const { forms } = configFile;
  const walletAddress = getWalletAddress(configFile);

  const updatedForms = forms.map((form: any) => {
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
    forms: updatedForms,
  };
};
