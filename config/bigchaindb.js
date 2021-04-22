const driver = require('bigchaindb-driver');

const API_PATH = 'http://localhost:9984/api/v1/';



 function Test() {
    const conn = new driver.Connection(API_PATH);
    try {
        const alice = new driver.Ed25519Keypair();
        console.log('Alice: ', alice.publicKey, alice);
        const assetdata = {
            'car': {
                'serial_number': 'AB70CD7695',
                'manufacturer': 'XYZ Inc.',
            }
        }
        const metadata = {
            'fuel_level': '75',
            'colour': 'Blue'
        }
        const assetCreateTx = driver.Transaction.makeCreateTransaction(
            assetdata,
            metadata,
            // Every transaction which you make requires an output
            [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(alice.publicKey))
            ],
            alice.publicKey
        );

        const assetCreateTxSigned = driver.Transaction.signTransaction(assetCreateTx, alice.privateKey);
        console.log('\n\nPosting signed create transaction for Alice:\n', assetCreateTxSigned);
        

        conn.postTransactionCommit(assetCreateTxSigned);

        txid = assetCreateTxSigned.id

        conn.getTransaction(assetCreateTxSigned.id)



    } catch (err) {
        console.error(err.message);
    }
}
module.exports = Test;