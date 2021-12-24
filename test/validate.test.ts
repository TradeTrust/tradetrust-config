import configSchemaV2 from "../src/config-v2.schema.json";
import configSchemaV3 from "../src/config-v3.schema.json";
import {
  ConfigMinimumExampleV2,
  ConfigMinimumExampleV3,
  ErrorHostname,
  ErrorNoWallet,
  ErrorUri,
} from "../src/examples/config-file";
import { validateConfig } from "../src/utils/utils";

describe("validateConfig v2", () => {
  test("should not throw for minimum config example", () => {
    expect(() =>
      validateConfig(configSchemaV2, ConfigMinimumExampleV2),
    ).not.toThrow();
  });

  test("should throw error for no wallet", () => {
    expect(() => validateConfig(configSchemaV2, ErrorNoWallet)).toThrow(
      /wallet must be object/,
    );
  });

  test("should throw error for documentStorage format", () => {
    expect(() => validateConfig(configSchemaV2, ErrorUri)).toThrow(
      /url must match format \"uri\"/,
    );
  });

  test("should throw error for location format", () => {
    expect(() => validateConfig(configSchemaV2, ErrorHostname)).toThrow(
      /location must match format/,
    );
  });
});

describe("validateConfig v3", () => {
  test("should not throw for minimum config example", () => {
    expect(() =>
      validateConfig(configSchemaV3, ConfigMinimumExampleV3),
    ).not.toThrow();
  });
});
