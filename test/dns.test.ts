import fetch from "cross-fetch";
import { buildData } from "../src/constants";

const testNetworks = buildData.filter((data) => data.chainId !== "1337"); // we omit checking for 1337 local
const mockFailData = [
  {
    chainId: "11155111",
    documentStoreAddress: "0x1234567890abcdef1234567890abcdef12345678", // intentionally wrong address
    tokenRegistryAddress: "0x1234567890abcdef1234567890abcdef12345678", // intentionally wrong address
    dnsVerifiable: "example.tradetrust.io",
    dnsTransferableRecord: "example.tradetrust.io",
    dnsDid: "example.tradetrust.io",
  },
];

const resolveDns = async (domainName: string) => {
  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${domainName}&type=TXT`
    );
    const data = await response.json();

    if (data.Status === 0) {
      return data.Answer;
    } else {
      console.log(`Unable to resolve IP address for ${domainName}`);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

type answerData = string | string[];

const hasDnsTxtAddress = (
  dnsResponseData: answerData,
  chainId: string,
  address: string
) => {
  const netId = `netId=${chainId}`;
  const addr = `addr=${address}`;

  return dnsResponseData.includes(netId) && dnsResponseData.includes(addr);
};

describe("dns txt-records", () => {
  test("should contain respective document store address with chainId", async () => {
    const found: boolean[] = [];

    for (let i = 0; i < testNetworks.length; i++) {
      const { dnsVerifiable, chainId, documentStoreAddress } = testNetworks[i];
      const answers = await resolveDns(dnsVerifiable);
      const isFound = answers.some((answer: { data: answerData }) =>
        hasDnsTxtAddress(answer.data, chainId, documentStoreAddress)
      );

      found.push(isFound);
    }

    expect(found.every((bool) => bool === true)).toBe(true);
  });

  test("should contain respective token registry address with chainId", async () => {
    const found: boolean[] = [];

    for (let i = 0; i < testNetworks.length; i++) {
      const { dnsTransferableRecord, chainId, tokenRegistryAddress } =
        testNetworks[i];
      const answers = await resolveDns(dnsTransferableRecord);
      const isFound = answers.some((answer: { data: string | string[] }) =>
        hasDnsTxtAddress(answer.data, chainId, tokenRegistryAddress)
      );
      found.push(isFound);
    }

    expect(found.every((bool) => bool === true)).toBe(true);
  });

  test("should fail when incorrect document store address exists on dns", async () => {
    const found: boolean[] = [];

    for (let i = 0; i < mockFailData.length; i++) {
      const { dnsVerifiable, chainId, documentStoreAddress } = mockFailData[i];

      const answers = await resolveDns(dnsVerifiable);
      const isFound = answers.some((answer: { data: string | string[] }) =>
        hasDnsTxtAddress(answer.data, chainId, documentStoreAddress)
      );
      found.push(isFound);
    }

    expect(found.every((bool) => bool === true)).toBe(false);
  });

  test("should fail when incorrect token registry address exists on dns", async () => {
    const found: boolean[] = [];

    for (let i = 0; i < mockFailData.length; i++) {
      const { dnsTransferableRecord, chainId, tokenRegistryAddress } =
        mockFailData[i];

      const answers = await resolveDns(dnsTransferableRecord);
      const isFound = answers.some((answer: { data: string | string[] }) =>
        hasDnsTxtAddress(answer.data, chainId, tokenRegistryAddress)
      );
      found.push(isFound);
    }

    expect(found.every((bool) => bool === true)).toBe(false);
  });
});
