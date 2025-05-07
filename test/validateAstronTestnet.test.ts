import configSchemaFormExampleV2 from "../build/astrontestnet/config-v2.json";
import configSchemaFormExampleV3 from "../build/astrontestnet/config-v3.json";
import configSchemaV2 from "../src/config-v2.schema.json";
import configSchemaV3 from "../src/config-v3.schema.json";
import {
  ConfigMinimumExampleV2,
  ConfigMinimumExampleV3,
  ErrorHostname,
  ErrorNoWallet,
  ErrorUri,
} from "../src/examples/config-file";
import { validateConfig, validateSchema } from "../src/utils/utils";

describe("validateConfig v2", () => {
  test("should not throw for minimum config example", () => {
    expect(() =>
      validateConfig(configSchemaV2, ConfigMinimumExampleV2)
    ).not.toThrow();
  });

  test("should throw error for no wallet", () => {
    expect(() => validateConfig(configSchemaV2, ErrorNoWallet as any)).toThrow(
      /wallet must be object/
    );
  });

  test("should throw error for documentStorage format", () => {
    expect(() => validateConfig(configSchemaV2, ErrorUri)).toThrow(
      /url must match format "uri"/
    );
  });

  test("should throw error for location format", () => {
    expect(() => validateConfig(configSchemaV2, ErrorHostname)).toThrow(
      /location must match format/
    );
  });
});

describe("validateConfig v3", () => {
  test("should not throw for minimum config example", () => {
    expect(() =>
      validateConfig(configSchemaV3, ConfigMinimumExampleV3)
    ).not.toThrow();
  });
});

describe("validateSchema", () => {
  const { forms } = configSchemaFormExampleV2;
  const invoice = forms.find((form) => form.name === "TradeTrust Invoice v2");
  const { schema } = invoice;

  test("should pass with valid data", () => {
    const { isValidated } = validateSchema(schema, {
      billFrom: {},
    });

    expect(isValidated).toBe(true);
  });

  test("should fail with additional data", () => {
    const { isValidated } = validateSchema(schema, {
      foo: "",
    });

    expect(isValidated).toBe(false);
  });
});

describe("validateSchema", () => {
  const { forms } = configSchemaFormExampleV3;
  const invoice = forms.find((form) => form.name === "TradeTrust Invoice v3");
  const { schema } = invoice;

  test("should pass with valid data", () => {
    const { isValidated } = validateSchema(schema, {
      billFrom: {},
    });

    expect(isValidated).toBe(true);
  });

  test("should fail with additional data", () => {
    const { isValidated } = validateSchema(schema, {
      foo: "",
    });

    expect(isValidated).toBe(false);
  });
});
