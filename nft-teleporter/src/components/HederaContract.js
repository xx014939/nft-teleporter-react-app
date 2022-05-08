import { AccountId, PrivateKey, Client, ContractFunctionParameters, ContractCallQuery } from "@hashgraph/sdk";

// Configure accounts and client
const operatorId = AccountId.fromString("0.0.34291274");
const operatorKey = PrivateKey.fromString("302e020100300506032b657004220420c6c010f0630c1112eab93bc8abf3d7b2d2d8b1caeb4aaf52a08df1456c7a28da");
    
// const client = Client.forTestnet().setOperator(operatorId, operatorKey);
    
async function callFunction() {
    console.log('testing')

    // Retrieve Account Public + Private Keys
    const accountID = document.getElementById('accountId').value
    const accountPrivateKey = document.getElementById('accountPrivateKey').value

    // Configure client
    const client = Client.forTestnet().setOperator(accountID, accountPrivateKey);

    console.log('Keys are here -->', accountID, accountPrivateKey)
    
    // Query the contract to check changes in state variable
    const contractQueryTx = new ContractCallQuery()
    .setContractId('0.0.34716571')
    .setGas(100000)
    .setFunction("getMobileNumber", new ContractFunctionParameters().addString("Alice"));
    const contractQuerySubmit = await contractQueryTx.execute(client);
    const contractQueryResult = contractQuerySubmit.getUint256(0);
    console.log(`- Here's the phone number that you asked for: ${contractQueryResult} \n`);
}

function HederaContract () {
    return(
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
            </div>
        <button onClick={callFunction}>CLICK ME</button>
        </div>
        </>
    )
}

export default HederaContract;