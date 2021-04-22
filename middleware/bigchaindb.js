const Patients = require('../models/patients');
const Users = require('../models/user');
const driver = require('bigchaindb-driver');

const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);


exports.createPatient = (patient, user) => {
    var userKeys;
    return new Promise((resolve, reject) => {
        const metadata = {
            "action": "introduced",
            "date": new Date().toISOString()
        };
        const assetdata = {
            "patient": {
               patient
            }
        }
        Users.findById(user.id)
            .then(user => {
                userKeys = user,
                    console.log(user, userKeys)
                const assetCreateTx = driver.Transaction.makeCreateTransaction(
                    assetdata,
                    metadata,
                    // Every transaction which you make requires an output
                    [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(userKeys.publicKey))
                    ],
                    userKeys.publicKey
                );
                //Sign the transaction
                const assetCreateTxSigned = driver.Transaction.signTransaction(assetCreateTx, userKeys.privateKey);
                console.log('\n\nPosting signed create transaction for User:\n', assetCreateTxSigned);
                conn.postTransactionCommit(assetCreateTxSigned).then(postedTransaction => {

                    //Let the promice resolve the created transaction.
                    resolve(postedTransaction);
                }).catch(err => {
                    reject(new Error(err));
                });
            }, (err) => next(err))
            .catch((err) => next(err));
    });


    //  var metadata = { "vaccineStatus": `${patient.vaccineStatus}`, "vaccineBrand": patient.vaccineBrand };

}