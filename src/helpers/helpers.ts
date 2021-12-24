import { WALLET_ADDRESS, walletSample } from "../examples/wallet";

export const getUpdatedConfigV2 = ({
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: any): any => {
  const { forms } = configFile;

  const updatedForms = forms.map((form: any) => {
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
            issuer.id = `did:ethr:0x${WALLET_ADDRESS}`;
            issuer.identityProof.key = `did:ethr:0x${WALLET_ADDRESS}#controller`;

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
    wallet: walletSample, // add in wallet sample
    forms: updatedForms,
  };
};

export const getUpdatedConfigV3 = ({
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: any): any => {
  const { forms } = configFile;

  const updatedForms = forms.map((form: any) => {
    if (form.type === "VERIFIABLE_DOCUMENT") {
      if (
        form.defaults.openAttestationMetadata.proof.method === "DOCUMENT_STORE"
      ) {
        form.defaults.openAttestationMetadata.proof.value =
          documentStoreAddress;
      } else if (form.defaults.openAttestationMetadata.proof.method === "DID") {
        form.defaults.openAttestationMetadata.proof.value = `did:ethr:0x${WALLET_ADDRESS}`;
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
    wallet: walletSample, // add in wallet sample
    forms: updatedForms,
  };
};
