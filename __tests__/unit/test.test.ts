import "jest-extended";

import { Managers, Transactions } from "@arkecosystem/crypto";
import { CertifiedDataBuilder } from "../../src/builders";
import { CertifiedDataTransaction } from "../../src/transactions";

describe("Test builder",()=>{
    it("Should verify correctly", ()=> {
        Managers.configManager.setFromPreset("testnet");
        Managers.configManager.setHeight(2); // v2 transactions (aip11) are available from height 2
        Transactions.TransactionRegistry.registerTransactionType(CertifiedDataTransaction);

        const builder = new CertifiedDataBuilder();
        const actual = builder
            .certifiedDataAsset({data: "certifieddatatostore"})
            .nonce("1")
            .sign("oil cricket silent piece cash isolate echo venture nation grit bullet have");


        console.log(actual.build().toJson());
        expect(actual.build().verified).toBeTrue();
        expect(actual.verify()).toBeTrue();
    });
});
