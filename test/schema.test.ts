import { handler } from "../netlify/functions/schema";

describe("schema v2", () => {
  test("should return v2 schema by default", async () => {
    const getSchema = handler as any;
    const response = await getSchema({
      queryStringParameters: {},
      headers: { origin: "https://creator.tradetrust.io" },
    });
    const { body } = response;

    expect(JSON.parse(body).$id).toContain("config-v2.schema.json");
  });
});

describe("schema v3", () => {
  test("should return v3 schema", async () => {
    const getSchema = handler as any;
    const response = await getSchema({
      queryStringParameters: { version: "3.0" },
      headers: { origin: "https://creator.tradetrust.io" },
    });
    const { body } = response;

    expect(JSON.parse(body).$id).toContain("config-v3.schema.json");
  });
});

describe("cors", () => {
  test("should disallow by default", async () => {
    const getSchema = handler as any;
    const response = await getSchema({
      queryStringParameters: {},
      headers: {},
    });
    const { headers } = response;

    expect(headers["Access-Control-Allow-Credentials"]).toBe(false);
  });

  test("should disallow other than creator.tradetrust.io", async () => {
    const getSchema = handler as any;
    const response = await getSchema({
      queryStringParameters: {},
      headers: { origin: "https://example.com" },
    });
    const { headers } = response;

    expect(headers["Access-Control-Allow-Credentials"]).toBe(false);
  });

  test("should only allow from creator.tradetrust.io", async () => {
    const getSchema = handler as any;
    const response = await getSchema({
      queryStringParameters: {},
      headers: { origin: "https://creator.tradetrust.io" },
    });
    const { headers } = response;

    expect(headers["Access-Control-Allow-Credentials"]).toBe(true);
  });
});
