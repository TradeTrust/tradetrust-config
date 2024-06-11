const configSchemaV2 = require("./config-v2.schema.json");
const configSchemaV3 = require("./config-v3.schema.json");
const configSchemaV4 = require("./config-v4.schema.json");

module.exports = () => {
  const data = { configSchemaV2, configSchemaV3, configSchemaV4 };
  return data;
};
