# TradeTrust creator configs

Repository to house TradeTrust creator config schema + various configs used in TradeTrust creator.

This repo:

- Aims to synchronise all the forms used in TradeTrust.
- Generates various config files with inputted `network`, `addresses`, `wallet`. Wallets used are testnets only!
- Is only as relevent as [TradeTrust creator](https://creator.tradetrust.io). If one day TradeTrust creator is obsolete, this should cease too.

## ✅ Latest config files

- https://github.com/TradeTrust/tradetrust-config/tree/master/build

The above [`build`](https://github.com/TradeTrust/tradetrust-config/tree/master/build) folder with the respective config files should always exists + available for download in this repo. They are meant to be shared with product owner end.

### Development

`npm run start`

---

## Documentation

- For [reading](https://docs.tradetrust.io/docs/reference/document-creator/config-file#config-file-structure).
- For interactive [explore](https://tradetrust-config.netlify.app). (based on types)
- For alternative interactive [explore](https://json-schema.app/view/%23?url=https%3A%2F%2Fraw.githubusercontent.com%2FTradeTrust%2Ftradetrust-config%2Fmaster%2Fsrc%2Fconfig-v2.schema.json). (based on json schema)

> Do note that there is config file with v3 forms too.

---

## Miscellaneous

### Differences between config file with v2 forms and v3 forms?

Mainly the `OpenAttestationDocument` in `defaults` field.

- form v2 [defaults](https://tradetrust-config.netlify.app/interfaces/src_types.formv2#defaults).
  - [OpenAttestationDocument](https://tradetrust-config.netlify.app/interfaces/node_modules__tradetrust_tt_tradetrust_dist_types___generated___schema_2_0.openattestationdocument).
- form v3 [defaults](https://tradetrust-config.netlify.app/interfaces/src_types.formv3#defaults).
  - [OpenAttestationDocument](https://tradetrust-config.netlify.app/interfaces/node_modules__tradetrust_tt_tradetrust_dist_types___generated___schema_3_0.openattestationdocument).

### Create config with TradeTrust CLI

Read more at [here](https://github.com/TradeTrust/tradetrust-cli#method-1-using-config-template-url-option-recommended).

### Debugging netlify functions

There is exposed config schema service available, however it is still experimental.

`npm run netlify`

make an url / postman GET request to `http://localhost:9999/.netlify/functions/schema`
