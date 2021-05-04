const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Patients = require('../../models/patients');
const Hospital = require('../../models/hospital');
const bgchain = require('../../middleware/bigchaindb');
const patientsRouter = express.Router();

patientsRouter.use(express.json());

patientsRouter.route('/')
    .get(auth, (req, res, next) => {
        Patients.find({})
            .then((patients) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(patients);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth,
        check('fullname', 'The fullname of the Patient is required').notEmpty(),
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
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                Hospital.findOne({ user: req.user.id })
                    .then(hospital => {
                        req.body.hospital = hospital.id;
                        Patients.create(req.body)
                            .then((patient) => {
                                hospital.numberOfDosesAvailable -= 1;
                                hospital.save()
                                    .then(hospital => {
                                    }, (err) => next(err));
                                //Create Asset and send it to bigchain
                                bgchain.createPatient(patient, req.user.id, hospital);//TODO:Check if is created
                                console.log("The patient created", patient);
                                res.statusCode = 200;
                                res.json(patient);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }
        })

    .put(auth, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /patients');
    })
    .delete(auth, (req, res, next) => {
        Patients.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


patientsRouter.route('/:patientId')
    .get(auth, (req, res, next) => {
        Patients.findById(req.params.patientId)
            .then((patient) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(patient);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /patients/' + req.params.patientId);
    })
    .put(auth,
        check('fullname', 'The fullname of the Patient is required').notEmpty(),
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
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                Patients.findByIdAndUpdate(req.params.patientId, {
                    $set: req.body
                }, { new: true })
                    .then((patient) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(patient);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }
        })

    .delete(auth, (req, res, next) => {
        Patients.findByIdAndRemove(req.params.patientId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = patientsRouter;