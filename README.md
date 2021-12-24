# TradeTrust config

Repository to house TradeTrust config schema + various configs used in TradeTrust creator.

### Dev

`npm run start`

### Documentation

- For [reading](https://docs.tradetrust.io/docs/document-creator/config-file/file-structure).
- For interactive [explore](https://json-schema.app/view/%23?url=https%3A%2F%2Fraw.githubusercontent.com%2FTradeTrust%2Ftradetrust-config%2Fmaster%2Fsrc%2Fconfig-v2.schema.json).
- For config file schema [itself](https://github.com/TradeTrust/tradetrust-config/blob/master/src/config-v2.schema.json).

> Do note that there is config file with v3 forms too.

### Config file

Reference [config file with v2 forms](https://github.com/TradeTrust/tradetrust-config/blob/master/build/config-reference-v2.json).
Reference [config file with v3 forms](https://github.com/TradeTrust/tradetrust-config/blob/master/build/config-reference-v3.json).

### Create config with OA CLI

```
open-attestation config create --output-dir ./example-configs --encrypted-wallet-path </path/to>/wallet.json --config-template-url https://raw.githubusercontent.com/TradeTrust/tradetrust-config/master/build/config-reference-v2.json
```

Read more at [here](https://github.com/Open-Attestation/open-attestation-cli#method-1-using-config-template-url-option-recommended).
