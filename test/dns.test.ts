import fetch from "cross-fetch";
import { buildData } from "../src/constants";

const testNetworks = buildData.filter((data) => data.chainId !== "1337"); // we omit checking for 1337 local

const resolveDns = async (domainName: string) => {
  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${domainName}&type=TXT`,
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

describe("dns txt-records", () => {
  test("should contain respective document store address", async () => {
    const found: boolean[] = [];

    for (let i = 0; i < testNetworks.length; i++) {
      const answers = await resolveDns(testNetworks[i].dnsVerifiable);
      const isFound = answers.some((answer: { data: string | string[] }) =>
        answer.data.includes(testNetworks[i].documentStoreAddress),
      );
      found.push(isFound);
    }

    expect(found.every((bool) => bool === true)).toBe(true);
  });

  test("should contain respective token registry address", async () => {
    const found: boolean[] = [];

    for (let i = 0; i < testNetworks.length; i++) {
      const answers = await resolveDns(testNetworks[i].dnsTransferableRecord);
      const isFound = answers.some((answer: { data: string | string[] }) =>
        answer.data.includes(testNetworks[i].tokenRegistryAddress),
      );
      found.push(isFound);
    }

    expect(found.every((bool) => bool === true)).toBe(true);
  });
});
