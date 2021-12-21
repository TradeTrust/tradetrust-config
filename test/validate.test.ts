import configSchema from "../src/config.schema.json";
import {
  ConfigMinimumExample,
  ErrorHostname,
  ErrorNoWallet,
  ErrorUri,
} from "../src/examples/config-file";
import { validateConfig } from "../src/helpers/validate-config";

describe("validateConfig", () => {
  test("should not throw for minimum config example", () => {
    expect(() =>
      validateConfig(configSchema, ConfigMinimumExample),
    ).not.toThrow();
  });

  test("should throw error for no wallet", () => {
    expect(() => validateConfig(configSchema, ErrorNoWallet)).toThrow(
      /wallet must be object/,
    );
  });

  test("should throw error for documentStorage format", () => {
    expect(() => validateConfig(configSchema, ErrorUri)).toThrow(
      /url must match format \"uri\"/,
    );
  });

  test("should throw error for location format", () => {
    expect(() => validateConfig(configSchema, ErrorHostname)).toThrow(
      /location must match format/,
    );
  });
});
