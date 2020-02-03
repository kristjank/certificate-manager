import "jest-extended";

import { Managers, Transactions } from "@arkecosystem/crypto";
import { CertifiedDataBuilder } from "../../src/builders";
import { CertifiedDataTransaction } from "../../src/transactions";
import { checkCommonFields} from "./helper";



let builder: CertifiedDataBuilder;

Managers.configManager.setHeight(2); // aip11 (v2 transactions) is true from height 2 on testnet


describe("Certified data registration transaction", () => {
    Managers.configManager.setFromPreset("testnet");

    Transactions.TransactionRegistry.registerTransactionType(CertifiedDataTransaction);

    beforeEach(() => {
        builder = new CertifiedDataBuilder();
    });

    it("Should verify correctly", () => {
        const actual = builder
            .certifiedDataAsset({ data: "ARK Core Blockchain Integration MasterClass #2:D" })
            .nonce("3")
            .sign("awful brand vocal relief wish afford avocado lobster run today wagon faith");

        console.log(JSON.stringify(actual.build().toJson(), null, " "));
        expect(actual.build().verified).toBeTrue();
        expect(actual.verify()).toBeTrue();
    });

    it("should ser/deserialize giving back original fields", () => {
        const builder = new CertifiedDataBuilder();
        const certifiedDataTransaction = builder
            .certifiedDataAsset({ data: "ARK Core Blockchain Integration MasterClass #2:D" })
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
            .certifiedDataAsset({ data: "ARK Core Blockchain Integration MasterClass #2:D" })
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
