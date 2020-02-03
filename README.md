![Imgur](https://i.imgur.com/8wiwey2.jpg)

# BCDiploma: Certificate Manager Plugin For Custom Transaction Certificate-Data

![Test](https://github.com/kristjank/certificate-manager/workflows/Test/badge.svg)


Registered Transaction is fully compatible with existing [API (api/transactions/)](https://api.ark.dev/public-rest-api/endpoints/transactions)

## STEP 1: dApp Installation

```bash
cd plugins/ #location for loading of custom non-core dApps
git submodule add -f https://gitlab.com/ark-x-bcdiploma/certificate-manager/
cd certificate-manager
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
