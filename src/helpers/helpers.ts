import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateConfig = (configSchema: any, configFile: any) => {
  const validate = ajv.compile(configSchema);
  const valid = validate(configFile);
  if (!valid) {
    throw new Error(ajv.errorsText(validate.errors));
  }
};
