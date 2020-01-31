import { Utils } from "@arkecosystem/crypto";

export enum BcDiplomaTransactionType {
    CertifiedData,
}

export const BcDiplomaTypeGroup = 1002;

export const BcDiplomaStaticFee = Utils.BigNumber.make("1000000");
