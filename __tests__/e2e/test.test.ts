import "jest-extended";

import { Managers, Transactions } from "@arkecosystem/crypto";
import { CertifiedDataBuilder } from "../../src/builders";
import { CertifiedDataTransaction } from "../../src/transactions";
import { RestClient } from "./rest-client";

describe("When e2e network is running with the plugin",()=>{
    it("Should accept the transaction", async ()=> {
        Managers.configManager.setFromPreset("testnet");
        Managers.configManager.setHeight(2); // v2 transactions (aip11) are available from height 2
        Transactions.TransactionRegistry.registerTransactionType(CertifiedDataTransaction);

        const builder = new CertifiedDataBuilder();
        const actual = builder
            .certifiedDataAsset({data: "datatostore"})
            .nonce("1")
            .sign("oil cricket silent piece cash isolate echo venture nation grit bullet have");

        const txJson = actual.build().toJson();
        const result = await RestClient.broadcast([txJson]);
        expect(result.body.data).toEqual({
            accept: [txJson.id],
            broadcast: [txJson.id],
            excess: [],
            invalid: []
        });
    });
});
