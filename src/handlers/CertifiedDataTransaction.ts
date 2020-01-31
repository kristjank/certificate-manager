import { Handlers, TransactionReader } from "@arkecosystem/core-transactions";
import { Interfaces, Transactions } from "@arkecosystem/crypto";
import { Database, State, TransactionPool } from "@arkecosystem/core-interfaces";
import { CertifiedDataTransaction } from "../transactions";
import { ICertifiedData } from "../interfaces";

export class CertifiedDataHandler extends Handlers.TransactionHandler {
	public getConstructor(): Transactions.TransactionConstructor {
		return CertifiedDataTransaction;
	}

	public async isActivated(): Promise<boolean> {
		return true;
	}

	public walletAttributes(): ReadonlyArray<string> {
		return ["certifiedData"];
	}

	public dependencies(): ReadonlyArray<Handlers.TransactionHandlerConstructor> {
		return [];
	}

	public async bootstrap(connection: Database.IConnection, walletManager: State.IWalletManager): Promise<void> {
		const reader: TransactionReader = await TransactionReader.create(connection, this.getConstructor());

		while (reader.hasNext()) {
			const transactions = await reader.read();
			for (const transaction of transactions) {
				const wallet: State.IWallet = walletManager.findByPublicKey(transaction.senderPublicKey);
				const asset: ICertifiedData = transaction.asset.certifiedData;
				wallet.setAttribute<ICertifiedData>("certifiedData", asset);
			}
		}

	}
	// Specify additional conditions when transaction can be applied
	public async throwIfCannotBeApplied(
		transaction: Interfaces.ITransaction,
		wallet: State.IWallet,
		databaseWalletManager: State.IWalletManager,
	): Promise<void> {
		return super.throwIfCannotBeApplied(transaction, wallet, databaseWalletManager);
	}

	// Specify additional conditions when transaction can be accepted in the transaction pool
	public async canEnterTransactionPool(
		data: Interfaces.ITransactionData,
		pool: TransactionPool.IConnection,
		processor: TransactionPool.IProcessor,
	): Promise<{ type: string, message: string } | null>  {

		return null;
	}

	public async applyToSender(
		transaction: Interfaces.ITransaction,
		walletManager: State.IWalletManager,
	): Promise<void> {
		await super.applyToSender(transaction, walletManager);

		const wallet: State.IWallet = walletManager.findByPublicKey(transaction.data.senderPublicKey);
		const asset: ICertifiedData = transaction.data.asset.certifiedData;
		wallet.setAttribute<ICertifiedData>("certifiedData", asset);
	}

	public async revertForSender(
		transaction: Interfaces.ITransaction,
		walletManager: State.IWalletManager,
	): Promise<void> {
		await super.revertForSender(transaction, walletManager);

		const sender: State.IWallet = walletManager.findByPublicKey(transaction.data.senderPublicKey);
		sender.forgetAttribute("certifiedData");
	}

	public async applyToRecipient(
		transaction: Interfaces.ITransaction,
		walletManager: State.IWalletManager,
		// tslint:disable-next-line: no-empty
	): Promise<void> { }

	public async revertForRecipient(
		transaction: Interfaces.ITransaction,
		walletManager: State.IWalletManager,
		// tslint:disable-next-line:no-empty
	): Promise<void> { }
}
