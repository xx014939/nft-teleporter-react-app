import React, { useState } from 'react';
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

async function mintNFT() {
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

  console.log('SUCCESS!!!')
}



const PageOne = () => {

// Set State Variables
const [subtitle, setSubtitle] = useState('Choose')
const [collection, setCollection] = useState('false');
let experience = [];

function stepTwo() {
  document.querySelector('.first-view').style.display = 'none'
  document.querySelector('.second-view').style.display = 'block'
  setSubtitle('Types of Experiences')
}

function stepThree() {
  document.querySelector('.second-view').style.display = 'none'
  document.querySelector('.third-view').style.display = 'block'
  setSubtitle('NFT Data')
  console.log(experience)
}

async function stepFour() {
  document.querySelector('.third-view').style.display = 'none'
  document.querySelector('.fourth-view').style.display = 'block'
  setSubtitle('Digital Assets')
  // Save Collectio Name & NFT Image
  const collectionName = document.getElementById('collectionName').value
  const tokenSymbol = document.getElementById('tokenSymbol').value
  const nftImage = ''
}

function stepFive() {
  document.querySelector('.fourth-view').style.display = 'none'
  document.querySelector('.fifth-view').style.display = 'block'
  setSubtitle('')
}

function deployContract() {
  console.log('deploying!')
  mintNFT()
}

  return (
    <>
    <div className="app-container">
        <div><h2>{subtitle}</h2></div>
        <div className="app-container__main-body first-view">
            <button onClick={stepTwo} className="app-container__button">Single NFT</button>
            <button onClick={() => {setCollection('true'); stepTwo()}} className="app-container__button">NFT Collection</button>
        </div>
        <div className="app-container__main-body second-view">
            <button onClick={() => {experience.push('VR')}} className="app-container__button">VR</button>
            <button onClick={() => {(experience.push('AR'))}} className="app-container__button">AR</button>
            <button onClick={() => {(experience.push('Video Content'))}} className="app-container__button">Video Content</button>
            <button onClick={() => {(experience.push('Browser Games'))}} className="app-container__button">Browser Games</button>
            <div><button onClick={stepThree} className="app-container__button">Continue</button></div>
        </div>
        <div className="app-container__main-body third-view">
          <div className="input-box-container">
            <label>
                NFT/Collection Name
                <input id='collectionName' type="text" />
            </label>
            <label>
                Token Symbol
                <input id='tokenSymbol' type="text" />
            </label>
            <label>
                NFT/Collection Image
                <input type="file" />
            </label>
          </div>
          <div><button onClick={stepFour} className="app-container__button">Continue</button></div>
        </div>
        <div className="app-container__main-body fourth-view">
          <div className="input-box-container">
            <label>
               3D Digital Object
              <input type="file" />
            </label>
            <label>
               2D Digital Object
              <input type="file" />
            </label>
            <label>
               MP4 Video File
              <input type="file" />
            </label>
            <label>
               Sound File
              <input type="file" />
            </label>
          </div>
          <div><button onClick={stepFive} className="app-container__button">Continue</button></div>
        </div>
        <div className="app-container__main-body fifth-view">
        <div className="input-box-container">
            <label>
              Treasury Wallet ID
              <input id="accountId" type="text" />
            </label>
            <label>
              Treasury Wallet Private Key
              <input id="accountPrivateKey" type="text" />
            </label>
          </div>
          <div>
            <button onClick={deployContract} className="app-container__button">Deploy NFT Smart Contract</button>
          </div>
        </div>
    </div>
    </>
  );
}

export default PageOne;