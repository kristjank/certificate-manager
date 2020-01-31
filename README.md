![Imgur](https://i.imgur.com/8wiwey2.jpg)

# BCDIPLOMA: Certificate Manager Plugin for Custom Transaction certificate-data

![Test](https://github.com/kristjank/certificate-manager/workflows/Test/badge.svg)


Registered Transaction is fully compatible with existing [API (api/transactions/)](https://api.ark.dev/public-rest-api/endpoints/transactions)

## dApp Installation

```bash
cd plugins/ #location for loading of custom non-core dApps
git submodule add -f https://gitlab.com/ark-x-bcdiploma/certificate-manager/
cd certificate-manager
```

### STEP 2: Load The dApp Module In The Corresponding Network Configurations.

Go to:
`core/packages/core/bin/testnet`

```bash
cd packages/core/bin/config/testnet
```

Locate file `plugins.js`. We will add our plugin name to end of the list of the loaded plugins. This means that core will pickup the plugin/dapp and load it for a specific network configuration. Add line `"@arkecosystem/custom-transactions": {}`: to the end of the `plugins.js` file, so it looks something like this:

```typescript
    "@arkecosystem/core-exchange-json-rpc": {
        enabled: process.env.CORE_EXCHANGE_JSON_RPC_ENABLED,
        host: process.env.CORE_EXCHANGE_JSON_RPC_HOST || "0.0.0.0",
        port: process.env.CORE_EXCHANGE_JSON_RPC_PORT || 8080,
        allowRemote: false,
        whitelist: ["127.0.0.1", "::ffff:127.0.0.1"],
    },
    "@arkecosystem/core-snapshots": {},
    "@bcdiploma/certificate-manager": {}, //our application hook (here we load the plugin/dapp)
```

**IMPORTANT**
After you have changed the content of `plugins.js` you need to run `yarn setup` from the `core` root folder. This will pick up your newly registered plugin and build it.



> You can create more transaction payloads by looking at the `__tests__` folder. In short it is as simple as:

```typescript
     const builder = new CertifiedDataBuilder();
        const actual = builder
            .certifiedDataAsset({ data: "certifieddatatostore" })
            .nonce("1")
            .sign("oil cricket silent piece cash isolate echo venture nation grit bullet have");

    console.log(actual.build().toJson());
```

You are using the builder classes you already implemented as part of the plugin.

#### Use Block Explorer To View&Search Local Running Testnet

Click here to setup local blockchain explorer in a few simple steps:
https://learn.ark.dev/core-getting-started/setup-local-blockchain-explorer

---

Congrats, your dapp is loaded. Now look at the resources below to understand more about our dapp development.

-   [Introduction To Custom Transactions](https://blog.ark.io/an-introduction-to-blockchain-application-development-part-2-2-909b4984bae)
-   [Learn Development With ARK](https://learn.ark.dev)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
