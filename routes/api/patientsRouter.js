const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Patients = require('../../models/patients');
const Hospital = require('../../models/hospital');
const bgchain = require('../../middleware/bigchaindb');
const User = require('../../models/user');
const patientsRouter = express.Router();

patientsRouter.use(express.json());
const mongo = false;

// @route    GET api/patients/
// @desc     Get All patients
// @access   Private
patientsRouter.get('/', auth, async (req, res) => {
    try {
        if (mongo) {
            const patients = await Patients.find({}).populate('hospital', ['name', 'city', 'address', 'country', '_id', 'afm']);
            if (!patients) {
                res.status(204).json({ msg: "There are no patients" });
            } else
                res.status(200).json(patients);
        } else {
            const bgPatients = await bgchain.getAllPatients();

            if (!bgPatients) {
                res.status(204).json({ msg: "There are no patients" });
            } else
                res.status(200).json(bgPatients);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route    GET api/patients/hospital
// @desc     Get patients from connected hospital
// @access   Private
patientsRouter.route('/hospital')
    .get(auth, async (req, res,) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            const hospital = await Hospital.findById(user.hospital);

            if (mongo) {
                const patients = await Patients.find({ hospital: hospital.id }).populate('hospital', ['name', 'city', 'address', 'country', '_id', 'afm']);
                if (!patients) {
                    res.status(204).json({ msg: "There are no patients" });
                } else
                    res.status(200).json(patients);
            } else {
                const bgPatients = await bgchain.getPatients(hospital.id);
                if (!bgPatients) {
                    res.status(204).json({ msg: "There are no patients" });
                } else
                    res.status(200).json(bgPatients);
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })
    // @route    Post api / patients /hospital
    // @desc     Post a new patient to mongo and bigChain
    // @access   Private
    .post(auth,
        check('firstname', 'The firstname of the Patient is required').notEmpty(),
        check('lastname', 'The lastname of the Patient is required').notEmpty(),
        check('birthdate')
            .isDate()
            .withMessage('Birthdate is not a date type yyyy/mm/dd')
            .notEmpty()
            .withMessage('Date of birth required'),
        check('amka')
            .isLength({ min: 11, max: 11 })
            .withMessage('Amka must be 11 numbers')
            .matches(/^[0-9]+$/)
            .withMessage('Is not an Amka type')
            .notEmpty()
            .withMessage('Amka of Paitient is required'),
        check('age')
            .isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120')
            .notEmpty()
            .withMessage('Age is required'),
        check('address', 'Address of Patient is required').notEmpty(),
        check('city', 'City of Patient is required').notEmpty(),
        check('country', 'Country of Patient is required').notEmpty(),
        check('sex', 'Sex of Patient is required').notEmpty(),
        check('vaccineStatus', 'The Status of vaccination of Patient is required').notEmpty(),
        check('vaccineBrand', 'The brand of the vaccine of Patient is required').notEmpty(),
        check('appointmentA')
            .isDate()
            .withMessage('The appointment is not a date type yyyy/mm/dd')
            .isAfter()
            .withMessage('The Appointment cannot be a date prior to today.')
            .notEmpty()
            .withMessage('Appointment of vaccinetaion is required'),
        async (req, res,) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                try {
                    const user = await User.findById(req.user.id).select('-password');
                    const _hospital = await Hospital.findById(user.hospital);
                    const {
                        firstname,
                        lastname,
                        birthdate,
                        amka,
                        age,
                        sex,
                        address,
                        city,
                        country,
                        vaccineStatus,
                        vaccineBrand,
                        appointmentA,
                        appointmentB,
                        additionalInfo,
                        ...rest
                    } = req.body

                    var hospital = _hospital.id;
                    const patientFields = {
                        firstname,
                        lastname,
                        birthdate,
                        amka,
                        age,
                        sex,
                        address,
                        city,
                        country,
                        vaccineStatus,
                        vaccineBrand,
                        appointmentA,
                        appointmentB,
                        additionalInfo,
                        hospital
                    };
                    var patient = await Patients.findOne({ amka: amka });

                    if (patient) {
                        return res
                            .status(400)
                            .json({ errors: [{ msg: 'Patient already exists' }] });
                    }

                    patient = (await Patients.create(patientFields)).populate('hospital', ['name', 'city', 'address', 'country', '_id', 'afm']);

                    //Delete vaccine doses - from appointments
                    for (let vaccine of _hospital.vaccines) {
                        if (vaccine.vaccineBrand == patient.vaccineBrand) {
                            vaccine.doses = vaccine.doses - vaccine.appointments;
                            await _hospital.save();
                        }
                    }

                    if (!mongo) {
                        patient = await Patients.findById(patient._id).populate('hospital', ['name', 'city', 'address', 'country', '_id', 'afm']);
                        console.log(patient);
                        let bgPatient = await bgchain.createPatient(_hospital, patient);

                        if (!bgPatient) {
                            return res.status(400).json({ errors: [{ msg: 'The patient was not created in BigChainDB' }] });
                        }
                    }
                    console.log("The patient created", patient);
                    res.status(200).json(patient);

                } catch (err) {
                    console.error(err.message);
                    res.status(500).send('Server error');
                }
            }
        }
    );

// @route    GET api / patients/:paitientId 
// @desc     Get a patient with id from  mongo and bigChain
// @access   Private
patientsRouter.route('/:patientId')
    .get(auth,
        async (req, res) => {
            try {
                if (mongo) {
                    var patient = await Patients.findById(req.params.patientId).populate('hospital', ['name', 'city', 'address', 'country', '_id', 'afm']);
                    if (!patient) {
                        res.status(204).json({ msg: "There is not a patient with that id" });
                    } else
                        res.status(200).json(patient);
                } else {
                    const bgPatient = await bgchain.getPatient(patientId);
                    if (!bgPatient) {
                        res.status(204).json({ msg: "There is not a patient with that id" });
                    } else
                        res.status(200).json(bgPatient);
                }
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        })
    // @route    Put api / patients/:paitientId 
    // @desc     Edit a patient with id from  mongo and bigChain
    // @access   Private
    .put(auth,
        check('firstname', 'The firstname of the Patient is required').notEmpty(),
        check('lastname', 'The lastname of the Patient is required').notEmpty(),
        check('birthdate')
            .isDate()
            .withMessage('Birthdate is not a date type yyyy/mm/dd')
            .notEmpty()
            .withMessage('Date of birth required'),
        check('amka')
            .isLength({ min: 11, max: 11 })
            .withMessage('Amka must be 11 numbers')
            .matches(/^[0-9]+$/)
            .withMessage('Is not an Amka type')
            .notEmpty()
            .withMessage('Amka of Paitient is required'),
        check('age')
            .isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120')
            .notEmpty()
            .withMessage('Age is required'),
        check('address', 'Address of Patient is required').notEmpty(),
        check('city', 'City of Patient is required').notEmpty(),
        check('country', 'Country of Patient is required').notEmpty(),
        check('sex', 'Sex of Patient is required').notEmpty(),
        check('vaccineStatus', 'The Status of vaccination of Patient is required').notEmpty(),
        check('vaccineBrand', 'The brand of the vaccine of Patient is required').notEmpty(),
        check('appointmentA')
            .isDate()
            .withMessage('The appointment is not a date type yyyy/mm/dd')
            .withMessage('The Appointment cannot be a date prior to today.')
            .notEmpty()
            .withMessage('Appointment of vaccinetaion is required'),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                try {
                    const user = await User.findById(req.user.id).select('-password');
                    const _hospital = await Hospital.findById(user.hospital);
                    var patient = await Patients.findById(req.params.patientId);

                    if (patient.vaccineStatus === "Cancelled") {
                        if (req.body.vaccineStatus === "Pending") {
                            //Update from Cancelled to pending
                            for (let vaccine of _hospital.vaccines) {
                                if (vaccine.vaccineBrand == patient.vaccineBrand) {
                                    vaccine.doses = vaccine.doses - vaccine.appointments;
                                    await _hospital.save();
                                }
                            }
                            patient = await Patients.findOneAndUpdate(req.params.patientId, {
                                $set: req.body
                            }, { new: true });
                        }
                        //Update From Pending to Completed
                        else {
                            patient = await Patients.findOneAndUpdate(req.params.patientId, {
                                $set: req.body
                            }, { new: true });
                        }
                        //Update from Pending to Cancelled
                    } else if (req.body.vaccineStatus === "Cancelled") {

                        patient = await Patients.findOneAndUpdate(req.params.patientId, {
                            $set: req.body
                        }, { new: true });

                        for (let vaccine of _hospital.vaccines) {
                            if (vaccine.vaccineBrand === patient.vaccineBrand) {
                                vaccine.doses = vaccine.doses + vaccine.appointments;
                                await _hospital.save();
                            }
                        }
                    } else {
                        patient = await Patients.findOneAndUpdate(req.params.patientId, {
                            $set: req.body
                        }, { new: true });
                    }

                    if (!mongo) {
                        patient = await Patients.findById(patient._id).populate('hospital', ['name', 'city', 'address', 'country', '_id', 'afm']);
                        var bgPatient = await bgchain.editPatient(req.params.patientId, patient);

                        if (!bgPatient) {
                            return res.status(400).json({ errors: [{ msg: 'The patient was not edited in BigChainDB' }] });
                        }
                    }
                    console.log(patient)
                    res.status(200).json(patient);
                } catch (err) {
                    console.error(err.message);
                    res.status(500).send('Server error');
                }
            }
        }
    )
    // @route    Delete api / patients/:paitientId 
    // @desc     Delete a patient with id from  mongo and bigChain
    // @access   Private
    .delete(auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            const patient = await Patients.findById(req.params.patientId);
            if (patient.hospital = user.hospital) {
                const patientDeleted = await Patients.findByIdAndRemove(req.params.patientId);
                if (!mongo) {
                    const bgPatientDeleted = await bgchain.deletePatient(req.params.patientId);
                    if (!bgPatientDeleted) {
                        return res.status(400).json({ errors: [{ msg: 'The patient was not deleted in BigChainDB' }] });
                    }
                }
                res.status(200).json(patientDeleted)
            } else {
                return res.status(400).json({ msg: 'The user is unauthorized to delete Patient' });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = patientsRouter;