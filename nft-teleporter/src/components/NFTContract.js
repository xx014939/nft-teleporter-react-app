import { 	
    AccountId,
	PrivateKey,
	Client,
	TokenCreateTransaction,
	TokenInfoQuery,
	TokenType,
	CustomRoyaltyFee,
	CustomFixedFee,
	Hbar,
	TokenSupplyType,
	TokenMintTransaction,} from "@hashgraph/sdk";



async function main() {
    // Configure accounts and client, and generate needed keys
    const operatorId = AccountId.fromString(document.getElementById('accountId').value)
    const operatorKey = PrivateKey.fromString(document.getElementById('accountPrivateKey').value)

    const treasuryId = AccountId.fromString(document.getElementById('accountId').value)
    const treasuryKey = PrivateKey.fromString(document.getElementById('accountPrivateKey').value)

    // Retrieve NFT name & Metadata
    const collectionName = document.getElementById('collectionName').value
    const tokenSymbol = document.getElementById('tokenSymbol').value


    const client = Client.forTestnet().setOperator(operatorId, operatorKey);
    console.log('client here -->', client)

    const supplyKey = PrivateKey.generate();
    const adminKey = PrivateKey.generate();
    const freezeKey = PrivateKey.generate();
    const wipeKey = PrivateKey.generate();

	// DEFINE CUSTOM FEE SCHEDULE
	let nftCustomFee = await new CustomRoyaltyFee()
		.setNumerator(5)
		.setDenominator(10)
		.setFeeCollectorAccountId(treasuryId)
		.setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(200)));

	// IPFS CONTENT IDENTIFIERS FOR WHICH WE WILL CREATE NFTs
	let CID = [
		"QmNPCiNA3Dsu3K5FxDPMG5Q3fZRwVTg14EXA92uqEeSRXn",
		"QmZ4dgAgt8owvnULxnKxNe8YqpavtVCXmc1Lt2XajFpJs9",
		"QmPzY5GxevjyfMUF5vEAjtyRoigzWp47MiKAtLBduLMC1T",
		"Qmd3kGgSrAwwSrhesYcY7K54f3qD7MDo38r7Po2dChtQx5",
		"QmWgkKz3ozgqtnvbCLeh7EaR1H8u5Sshx3ZJzxkcrT3jbw",
	];

	// CREATE NFT WITH CUSTOM FEE
	let nftCreate = await new TokenCreateTransaction()
		.setTokenName(`${collectionName}`)
		.setTokenSymbol(`${tokenSymbol}`)
		.setTokenType(TokenType.NonFungibleUnique)
		.setDecimals(0)
		.setInitialSupply(0)
		.setTreasuryAccountId(treasuryId)
		.setSupplyType(TokenSupplyType.Finite)
		.setMaxSupply(CID.length)
		.setCustomFees([nftCustomFee])
		.setAdminKey(adminKey)
		.setSupplyKey(supplyKey)
		// .setPauseKey(pauseKey)
		.setFreezeKey(freezeKey)
		.setWipeKey(wipeKey)
		.freezeWith(client)
		.sign(treasuryKey);

	let nftCreateTxSign = await nftCreate.sign(adminKey);
	let nftCreateSubmit = await nftCreateTxSign.execute(client);
	let nftCreateRx = await nftCreateSubmit.getReceipt(client);
	let tokenId = nftCreateRx.tokenId;
	console.log(`Created NFT with Token ID: ${tokenId} \n`);

	// TOKEN QUERY TO CHECK THAT THE CUSTOM FEE SCHEDULE IS ASSOCIATED WITH NFT
	var tokenInfo = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
	console.table(tokenInfo.customFees[0]);

	// MINT NEW BATCH OF NFTs
	let nftLeaf = [];
	for (var i = 0; i < CID.length; i++) {
		nftLeaf[i] = await tokenMinterFcn(CID[i]);
		console.log(`Created NFT ${tokenId} with serial: ${nftLeaf[i].serials[0].low}`);
	}

	// TOKEN MINTER FUNCTION ==========================================
	async function tokenMinterFcn(CID) {
		let mintTx = await new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([CID])
			.freezeWith(client);
		let mintTxSign = await mintTx.sign(supplyKey);
		let mintTxSubmit = await mintTxSign.execute(client);
		let mintRx = await mintTxSubmit.getReceipt(client);
		return mintRx;
	}

	// BALANCE CHECKER FUNCTION ==========================================
	// async function bCheckerFcn(id) {
	// 	let balanceCheckTx = await new AccountBalanceQuery().setAccountId(id).execute(client);
	// 	return [balanceCheckTx.tokens._map.get(tokenId.toString()), balanceCheckTx.hbars];
	// }

    console.log('SUCCESS!!!')
}

function NFTContract() {
    return (
        <>
        <div>
            <div>
                <label>
                    Account ID: 
                    <input id="accountId" type="text" name="accountId" />
                </label>
                <label>
                    Account Private Key (We don't save this): 
                    <input id="accountPrivateKey" type="text" name="accountPrivate" />
                </label>
                <label>
                    Collection Name: 
                    <input id="collectionName" type="text" name="collectionName" />
                </label>
                <label>
                    Token Symbol: 
                    <input id="tokenSymbol" type="text" name="tokenSymbol" />
                </label>
            </div>
            <button onClick={main}>CONTINUE</button>
        </div>
        </>
    )
}

export default NFTContract;