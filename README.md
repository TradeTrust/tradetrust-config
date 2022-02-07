# TradeTrust config

Repository to house TradeTrust config schema + various configs used in TradeTrust creator.

### Latest config files

- https://github.com/TradeTrust/tradetrust-config/tree/master/build

### Development

`npm run start`

### Build config files

`npm run build`

### Documentation

- For [reading](https://docs.tradetrust.io/docs/document-creator/config-file/file-structure).
- For interactive [explore](https://tradetrust-config.netlify.app). (based on types)
- For alternative interactive [explore](https://json-schema.app/view/%23?url=https%3A%2F%2Fraw.githubusercontent.com%2FTradeTrust%2Ftradetrust-config%2Fmaster%2Fsrc%2Fconfig-v2.schema.json). (based on json schema)

> Do note that there is config file with v3 forms too.

### Config file

- Reference [config file with v2 forms](https://github.com/TradeTrust/tradetrust-config/blob/master/build/config-reference-v2.json).
- Reference [config file with v3 forms](https://github.com/TradeTrust/tradetrust-config/blob/master/build/config-reference-v3.json).

### Differences between config file with v2 forms and v3 forms?

Mainly the `OpenAttestationDocument` in `defaults` field.

- form v2 [defaults](https://tradetrust-config.netlify.app/interfaces/src_types.formv2#defaults).
  - [OpenAttestationDocument](https://tradetrust-config.netlify.app/interfaces/node_modules__govtechsg_open_attestation_dist_types___generated___schema_2_0.openattestationdocument).
- form v3 [defaults](https://tradetrust-config.netlify.app/interfaces/src_types.formv3#defaults).
  - [OpenAttestationDocument](https://tradetrust-config.netlify.app/interfaces/node_modules__govtechsg_open_attestation_dist_types___generated___schema_3_0.openattestationdocument).

### Create config with OA CLI

```
open-attestation config create --output-dir ./example-configs --encrypted-wallet-path </path/to>/wallet.json --config-template-url https://raw.githubusercontent.com/TradeTrust/tradetrust-config/master/build/config-reference-v2.json
```

Read more at [here](https://github.com/Open-Attestation/open-attestation-cli#method-1-using-config-template-url-option-recommended).

### Debugging netlify functions

`npm run netlify`

make an url / postman GET request to `http://localhost:9999/.netlify/functions/schema`
