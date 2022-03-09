import { utils } from "@govtechsg/open-attestation";
import {
  ConfigFileWithFormV2,
  ConfigFileWithFormV3,
  GetUpdatedConfigFileWithFormV2,
  GetUpdatedConfigFileWithFormV3,
  FormV2,
  FormV3,
} from "../types";

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
  const { forms } = configFile;

  const updatedForms = forms.map((form: FormV2) => {
    utils.updateFormV2({
      wallet,
      form,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });
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
  const { forms } = configFile;

  const updatedForms = forms.map((form: FormV3) => {
    utils.updateFormV3({
      wallet,
      form,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });

    return form;
  });

  return {
    ...configFile,
    network,
    wallet,
    forms: updatedForms,
  };
};
