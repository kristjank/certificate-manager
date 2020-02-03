import "jest-extended";

import { Managers, Transactions } from "@arkecosystem/crypto";
import { CertifiedDataBuilder } from "../../src/builders";
import { CertifiedDataTransaction } from "../../src/transactions";

describe("Test builder", () => {
    it("Should verify correctly", () => {
        Managers.configManager.setFromPreset("devnet");
        Managers.configManager.setHeight(2); // v2 transactions (aip11) are available from height 2
        Transactions.TransactionRegistry.registerTransactionType(CertifiedDataTransaction);

        const builder = new CertifiedDataBuilder();
        const actual = builder
            .certifiedDataAsset({ data: "ARK Core Blockchain Integration MasterClass :D" })
            .nonce("1")
            .sign("awful brand vocal relief wish afford avocado lobster run today wagon faith");

        console.log(JSON.stringify(actual.build().toJson(), null, " "));
        expect(actual.build().verified).toBeTrue();
        expect(actual.verify()).toBeTrue();
    });
});
