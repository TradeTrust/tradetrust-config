import fs from "fs";
import path from "path";
import junk from "junk";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { ConfigFileWithFormV2, ConfigFileWithFormV3, ConfigFileWithFormV4 } from "../types";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateConfig = (
  configSchema: any,
  configFile: ConfigFileWithFormV2 | ConfigFileWithFormV3 | ConfigFileWithFormV4,
) => {
  const validate = ajv.compile(configSchema);
  const valid = validate(configFile);
  if (!valid) {
    throw new Error(ajv.errorsText(validate.errors));
  }
};

export const validateSchema = (schema: any, data: any) => {
  const ajv = new Ajv({ allErrors: true });
  const isValidated = ajv.validate(schema, data);

  return { isValidated, errors: ajv.errors };
};

export const getForms = (dir: string) => {
  const forms: any[] = []; // let it be v2, v3 or v4 forms
  fs.readdirSync(dir)
    .filter(junk.not)
    .forEach((filename: string) => {
      const content = fs.readFileSync(path.join(dir, filename), "utf-8");
      forms.push(JSON.parse(content));
    });
  return forms;
};
