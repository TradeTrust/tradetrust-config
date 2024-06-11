import { updateFormV2, updateFormV3, updateFormV4 } from "../shared";
import {
  ConfigFileWithFormV2,
  ConfigFileWithFormV3,
  ConfigFileWithFormV4,
  GetUpdatedConfigFileWithFormV2,
  GetUpdatedConfigFileWithFormV3,
  GetUpdatedConfigFileWithFormV4,
  FormV2,
  FormV3,
  FormV4,
} from "../types";
import { SUPPORTED_CHAINS } from "@tradetrust-tt/tradetrust-utils/constants/supportedChains";

export const getUpdatedConfigV2 = ({
  chainId,
  wallet,
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: GetUpdatedConfigFileWithFormV2): ConfigFileWithFormV2 => {
  const { forms } = configFile;
  const chain = SUPPORTED_CHAINS[chainId];

  const updatedForms = forms.map((form: FormV2) => {
    return updateFormV2({
      chain,
      wallet,
      form,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });
  });

  return {
    ...configFile,
    network: chain.name,
    wallet,
    forms: updatedForms,
  };
};

export const getUpdatedConfigV3 = ({
  chainId,
  wallet,
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: GetUpdatedConfigFileWithFormV3): ConfigFileWithFormV3 => {
  const { forms } = configFile;
  const chain = SUPPORTED_CHAINS[chainId];

  const updatedForms = forms.map((form: FormV3) => {
    return updateFormV3({
      chain,
      wallet,
      form,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });
  });

  return {
    ...configFile,
    network: chain.name,
    wallet,
    forms: updatedForms,
  };
};

export const getUpdatedConfigV4 = ({
  chainId,
  wallet,
  configFile,
  documentStoreAddress,
  tokenRegistryAddress,
  dnsVerifiable,
  dnsDid,
  dnsTransferableRecord,
}: GetUpdatedConfigFileWithFormV4): ConfigFileWithFormV4 => {
  const { forms } = configFile;
  const chain = SUPPORTED_CHAINS[chainId];

  const updatedForms = forms.map((form: FormV4) => {
    return updateFormV4({
      chain,
      wallet,
      form,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });
  });

  return {
    ...configFile,
    network: chain.name,
    wallet,
    forms: updatedForms,
  };
};
