![Imgur](https://i.imgur.com/8wiwey2.jpg)
# BCDIPLOMA: Certificate-Data custom transaction implementation

![Test](https://github.com/kristjank/certificate-manager/workflows/Test/badge.svg)

### INSTALL: Load The dApp Module In The Corresponding Network Configurations.

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
    "@arkecosystem/certificate-manager": {}, //our application hook (here we load the plugin/dapp)
```

**IMPORTANT**
After you have changed the content of `plugins.js` you need to run `yarn setup` from the `core` root folder. This will pick up your newly registered plugin and build it.

---

Congrats, your dapp is loaded. Now look at the resources below to understand more about our dapp development.

-   [Introduction To Custom Transactions](https://blog.ark.io/an-introduction-to-blockchain-application-development-part-2-2-909b4984bae)
-   [Learn Development With ARK](https://learn.ark.dev)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
