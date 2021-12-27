import fs from "fs";
import path from "path";
import junk from "junk";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { ConfigFile, Form } from "../types/types";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateConfig = (configSchema: any, configFile: ConfigFile) => {
  const validate = ajv.compile(configSchema);
  const valid = validate(configFile);
  if (!valid) {
    throw new Error(ajv.errorsText(validate.errors));
  }
};

export const getForms = (dir: string) => {
  const forms: Form[] = [];
  fs.readdirSync(dir)
    .filter(junk.not)
    .forEach((filename: string) => {
      const content = fs.readFileSync(path.join(dir, filename), "utf-8");
      forms.push(JSON.parse(content));
    });
  return forms;
};
