import "jest-extended";

import { Managers, Transactions } from "@arkecosystem/crypto";
import { CertifiedDataBuilder } from "../../src/builders";
import { CertifiedDataTransaction } from "../../src/transactions";
import { checkCommonFields} from "./helper";



let builder: CertifiedDataBuilder;

Managers.configManager.setHeight(2); // aip11 (v2 transactions) is true from height 2 on testnet
Managers.configManager.setFromPreset("testnet");

describe("Certified data registration transaction", () => {
    Transactions.TransactionRegistry.registerTransactionType(CertifiedDataTransaction);

    beforeEach(() => {
        builder = new CertifiedDataBuilder();
    });

    it("Should verify correctly", () => {
        const actual = builder
            .certifiedDataAsset({ data: "ARK Core Blockchain Integration MasterClass #5:D" })
            .nonce("5")
            .sign("awful brand vocal relief wish afford avocado lobster run today wagon faith");

        console.log(JSON.stringify(actual.build().toJson(), null, " "));
        expect(actual.build().verified).toBeTrue();
        expect(actual.verify()).toBeTrue();
    });

    it("should ser/deserialize giving back original fields", () => {
        const builder = new CertifiedDataBuilder();
        const certifiedDataTransaction = builder
            .certifiedDataAsset({ data: ";0x03;;UUSLCv2MC1bp/rl9TMeyTNUARY6DNPcF/2+Ak1YNjRKlRbZyKji5i0gWVQnt7oWqio0xtukCnavGt2k7XU/qyS5jS0/YzsDFZ7Y8QGSnI5I/oN28RToUYJJUcmC6hOLwrpfyuaAhTkAbItHUP4vc74RamjUGxkMPWxfqe1mjgv1hj8NJehrmB0uRYC5u8IKap6Y5MumLtC6zuvSOGBGs9LtZQOsTwJY5vrqe3fkVHNNoBuAobdlCWyRbAvkShKJD0937c24v8JdIqDuPzpy63Kj5IfyRK5MYp2FKLWORN9xv3ciVJjh8+CXfgssrLyq654u6IBFnLZGMAsDAytvvIA==;" })
            .nonce("3")
            .sign("awful brand vocal relief wish afford avocado lobster run today wagon faith")
            .getStruct();

        const serialized = Transactions.TransactionFactory.fromData(certifiedDataTransaction).serialized.toString("hex");
        const deserialized = Transactions.Deserializer.deserialize(serialized);

        checkCommonFields(deserialized, certifiedDataTransaction);

        expect(deserialized.data.asset.certifiedData).toStrictEqual(
            certifiedDataTransaction.asset.certifiedData,
        );
    });

    it("should ser/deserialize giving back original fields", () => {
        const builder = new CertifiedDataBuilder();
        const certifiedDataTransaction = builder
            .certifiedDataAsset({ data: ";0x03;;UUSLCv2MC1bp/rl9TMeyTNUARY6DNPcF/2+Ak1YNjRKlRbZyKji5i0gWVQnt7oWqio0xtukCnavGt2k7XU/qyS5jS0/YzsDFZ7Y8QGSnI5I/oN28RToUYJJUcmC6hOLwrpfyuaAhTkAbItHUP4vc74RamjUGxkMPWxfqe1mjgv1hj8NJehrmB0uRYC5u8IKap6Y5MumLtC6zuvSOGBGs9LtZQOsTwJY5vrqe3fkVHNNoBuAobdlCWyRbAvkShKJD0937c24v8JdIqDuPzpy63Kj5IfyRK5MYp2FKLWORN9xv3ciVJjh8+CXfgssrLyq654u6IBFnLZGMAsDAytvvIA==;" })
            .nonce("3")
            .sign("awful brand vocal relief wish afford avocado lobster run today wagon faith")
            .getStruct();

        const serialized = Transactions.TransactionFactory.fromData(certifiedDataTransaction).serialized.toString("hex");
        const deserialized = Transactions.Deserializer.deserialize(serialized);

        checkCommonFields(deserialized, certifiedDataTransaction);

        expect(deserialized.data.asset.certifiedData).toStrictEqual(
            certifiedDataTransaction.asset.certifiedData,
        );
    });
});
