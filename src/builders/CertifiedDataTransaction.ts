import { Interfaces, Transactions, Utils } from "@arkecosystem/crypto";
import { BcDiplomaStaticFee, BcDiplomaTransactionType, BcDiplomaTypeGroup } from "../enums";
import { ICertifiedData } from "../interfaces";

export class CertifiedDataBuilder extends Transactions.TransactionBuilder<CertifiedDataBuilder> {
	constructor() {
		super();
		this.data.version = 2;
		this.data.typeGroup = BcDiplomaTypeGroup;
		this.data.type = BcDiplomaTransactionType.CertifiedData;
		this.data.fee = BcDiplomaStaticFee;
		this.data.amount = Utils.BigNumber.ZERO;
		this.data.asset = { certifiedData: {} as ICertifiedData };
	}

	public certifiedDataAsset(certifiedDataAsset: ICertifiedData): CertifiedDataBuilder {
		this.data.asset.certifiedData = {
			...certifiedDataAsset
		};
		return this;
	}


	public getStruct(): Interfaces.ITransactionData {
		const struct: Interfaces.ITransactionData = super.getStruct();
		struct.amount = this.data.amount;
		struct.asset = this.data.asset;
		return struct;
	}

	protected instance(): CertifiedDataBuilder {
		return this;
	}

}
