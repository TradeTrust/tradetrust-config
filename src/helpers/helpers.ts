import { updateFormV2, updateFormV3 } from "../shared";
import {
  ConfigFileWithFormV2,
  ConfigFileWithFormV3,
  GetUpdatedConfigFileWithFormV2,
  GetUpdatedConfigFileWithFormV3,
  FormV2,
  FormV3,
} from "../types";
import { SUPPORTED_CHAINS } from "@govtechsg/tradetrust-utils/constants/supportedChains";

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
    updateFormV2({
      wallet,
      form,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });

    return {
      ...form,
      defaults: {
        ...form.defaults,
        network: {
          chain: chain.currency,
          chainId,
        },
      },
    };
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
    updateFormV3({
      wallet,
      form,
      documentStoreAddress,
      tokenRegistryAddress,
      dnsVerifiable,
      dnsDid,
      dnsTransferableRecord,
    });

    return {
      ...form,
      network: {
        chain: chain.currency,
        chainId,
      },
    };
  });

  return {
    ...configFile,
    network: chain.name,
    wallet,
    forms: updatedForms,
  };
};
