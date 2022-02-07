import { Handler } from "@netlify/functions";
import schemaV2 from "../../../src/config-v2.schema.json";
import schemaV3 from "../../../src/config-v3.schema.json";

const ALLOWED_ORIGINS = ["https://creator.tradetrust.io"];

export const handler: Handler = async (event) => {
  const { version } = event.queryStringParameters;
  const origin = event.headers.origin;
  const schema = version === "3.0" ? schemaV3 : schemaV2;
  let headers;

  if (ALLOWED_ORIGINS.includes(origin)) {
    headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": true,
    };
  } else {
    headers = {
      "Access-Control-Allow-Credentials": false,
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(schema),
  };
};
