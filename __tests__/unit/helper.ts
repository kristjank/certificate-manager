import { Interfaces } from "@arkecosystem/crypto";

export const checkCommonFields = (deserialized: Interfaces.ITransaction, expected) => {
    const fieldsToCheck = ["version", "type", "senderPublicKey", "fee", "amount", "nonce", "network"];
    for (const field of fieldsToCheck) {
        expect(deserialized.data[field].toString()).toEqual(expected[field].toString());
    }
    expect(deserialized.data.asset.certifiedData.data).toEqual(expected.asset.certifiedData.data);
};
