import { Transactions, Utils } from "@arkecosystem/crypto";
import ByteBuffer from "bytebuffer";
import { BcDiplomaStaticFee, BcDiplomaTransactionType, BcDiplomaTypeGroup } from "../enums";
import { ICertifiedData } from "../interfaces";

const { schemas } = Transactions;

export class CertifiedDataTransaction extends Transactions.Transaction {
    public static typeGroup: number = BcDiplomaTypeGroup;
    public static type: number = BcDiplomaTransactionType.CertifiedData;
    public static key: string = "certifiedData";

    public static getSchema(): Transactions.schemas.TransactionSchema {
        return schemas.extend(schemas.transactionBaseSchema, {
            $id: "certifiedData",
            required: ["asset", "typeGroup"],
            properties: {
                type: { transactionType: BcDiplomaTransactionType.CertifiedData },
                typeGroup: { const: BcDiplomaTypeGroup },
                amount: { bignumber: { minimum: 0, maximum: 0 } },
                asset: {
                    type: "object",
                    required: ["certifiedData"],
                    properties: {
                        certifiedData: {
                            type: "object",
                            required: ["data"],
                            properties: {
                                data: {
                                    type: "string",
                                    minLength: 6,
                                    maxLength: 30000,
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    protected static defaultStaticFee: Utils.BigNumber = BcDiplomaStaticFee;

    public serialize(): ByteBuffer {
        const { data } = this;
        const certifiedData: ICertifiedData = data.asset.certifiedData as ICertifiedData;

        const dataToSerialize: Buffer = Buffer.from(certifiedData.data, "utf8");

        const buffer: ByteBuffer = new ByteBuffer(dataToSerialize.length + 6, true);

        buffer.writeUint16(dataToSerialize.length);
        buffer.append(dataToSerialize, "hex");

        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        const { data } = this;

        const dataLength = buf.readUint16();
        const dataRead = buf.readString(dataLength);

        const certifiedData: ICertifiedData = {
            data: dataRead,
        };

        data.asset = {
            certifiedData,
        };
    }
}
