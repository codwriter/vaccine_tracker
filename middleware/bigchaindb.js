const Users = require('../models/user');
const driver = require('bigchaindb-driver');

const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);


exports.createPatient = (patient, userID, {name,address}) => {
    return new Promise((resolve, reject) => {
        var patientAssetData = patient[0];
        var patientMetaData = (({ vaccineStatus, vaccineBrand, numberOfDoses }) => ({ vaccineStatus, vaccineBrand, numberOfDoses }))(patientAssetData);
        patientMetaData.hospital = { "HospitalName": name, "Address": address };

        console.log("the metadata is ", patientMetaData);
        const assetdata = {
            "patient": patientAssetData
        }
        Users.findById(userID)
            .then(user => {
                const assetCreateTx = driver.Transaction.makeCreateTransaction(
                    assetdata,
                    patientMetaData,
                    // Every transaction which you make requires an output
                    [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(user.publicKey))
                    ],
                    user.publicKey
                );
                //Sign the transaction
                const assetCreateTxSigned = driver.Transaction.signTransaction(assetCreateTx, user.privateKey);
                console.log('\n\nPosting signed create transaction for User:\n', assetCreateTxSigned);
                //Send the transaction
                conn.postTransactionCommit(assetCreateTxSigned).then(postedTransaction => {

                    //Let the promice resolve the created transaction.
                    resolve(postedTransaction);
                }).catch(err => {
                    reject(new Error(err));
                });
            }, (err) => next(err))
            .catch((err) => next(err));
    });

}