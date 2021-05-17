const driver = require('bigchaindb-driver');
const Hospitals = require('../models/hospital');

const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);

exports.createPatient = (hospital, patient) => {
    return new Promise((resolve, reject) => {
        var patientAssetData = patient.id;
        var patientMetaData = patient;
        patientMetaData.hospital = (({ _id, name }) => ({ _id, name, }))(hospital);
        // patientMetaData.hospital = {"_id" :hospital.id,"name":hospital.name};

        console.log("the metadata is ", patientMetaData);
        const assetdata = {
            "patient": patientAssetData
        }
        const assetCreateTx = driver.Transaction.makeCreateTransaction(
            assetdata,
            patientMetaData,
            // Every transaction requires an output
            [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(hospital.keypair.publicKey))
            ],
            hospital.keypair.publicKey
        );

        //Sign the transaction
        const assetCreateTxSigned = driver.Transaction.signTransaction(assetCreateTx, hospital.keypair.privateKey);
        console.log('\n\nPosting signed create transaction for User:\n', assetCreateTxSigned);
        //Send the transaction
        conn.postTransactionCommit(assetCreateTxSigned).then(postedTransaction => {

            //Let the promice resolve the created transaction.
            resolve(postedTransaction);
        }).catch(err => {
            reject(new Error(err));
        });
    });
}
// Get patients
exports.getPatients = async (hospitalId) => {
    try {
        var patients = [];
        let hospital = await Hospitals.findById(hospitalId);
        // Every unspent transaction
        let res = await conn.listOutputs(hospital.keypair.publicKey, false);
        for (let i = 0; i < res.length; i++) {
            let patient = await conn.searchMetadata(res[i].transaction_id);
            patients.push(patient[0].metadata);
        }
        // patients = patients.map(patient => { patient.metadata.bgID = patient.id;return patients.patient = patient.metadata;});
        return patients;
    } catch (error) {
        console.error(error.message);
    }
}

// Get Patient
exports.getPatient = async (patientId) => {
    try {
        let patient = await conn.searchMetadata(patientId);
        patient = patient[patient.length - 1].metadata
        console.log(patient);
        return patient;
    } catch (error) {
        console.error(error.message);
    }
}
exports.editPatients = async (patientId, editedPatient) => {
    try {
        let patient = await conn.searchMetadata(patientId);
        // Take the most recent metadata of the patient
        patient = patient[patient.length - 1];
        // Get the keypair from Hospital
        const hospital = await Hospitals.findById(patient.metadata.hospital);
        // Find the latest transaction
        let transaction = await conn.getTransaction(patient.id);

        const txTransferToMyself = driver.Transaction.makeTransferTransaction(
            [{ tx: transaction, output_index: 0 }],
            [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(hospital.keypair.publicKey))],
            editedPatient
        );

        // Sign Transaction with private key
        txTransferToMyselfSigned = await driver.Transaction.signTransaction(txTransferToMyself, hospital.keypair.privateKey);
        console.log(txTransferToMyself);
        // Send it to Bigchain
        await conn.postTransactionCommit(txTransferToMyselfSigned);
    } catch (error) {
        console.error(error.message);
    }
}
// Delete: change metadata to null, make transction non transferable
// Input Patient ID
exports.deletePatient = async (patientId) => {
    try {
        let patient = await conn.searchMetadata(patientId);
        // Take the most recent metadata of the patient
        patient = patient[patient.length - 1];
        // Get the keypair from Hospital
        const hospital = await Hospitals.findById(patient.metadata.hospital);
        // Find the latest transaction
        let transaction = await conn.getTransaction(patient.id);
        // Random Keypair
        let randomKeypair = new driver.Ed25519Keypair();
       
        const txDeleteTransfer = driver.Transaction.makeTransferTransaction(
            [{ tx: transaction, output_index: 0 }],
            [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(randomKeypair.publicKey))],
            {Patient:"Deleted"}
        );

        // Sign Transaction with private key
        txDeletedTranferSigned = driver.Transaction.signTransaction(txDeleteTransfer, hospital.keypair.privateKey);
        console.log(txDeletedTranferSigned);
        // Send it to Bigchain
        await conn.postTransactionCommit(txDeletedTranferSigned);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}