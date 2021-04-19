const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const auth = require('../../middleware/auth');
const Patients = require('../../models/patients');

const patientsRouter = express.Router();

patientsRouter.use(express.json());

patientsRouter.route('/')
    .get(auth,(req, res, next) => {
        Patients.find({})
            .then((patients) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(patients);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth,(req, res, next) => {
        Patients.create(req.body)
            .then((patient) => {
                console.log("The patient created", patient);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(patient);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(auth,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /patients');
    })
    .delete(auth,(req, res, next) => {
        Patients.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


patientsRouter.route('/:patientId')
    .get(auth,(req, res, next) => {
        Patients.findById(req.params.patientId)
            .then((patient) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(patient);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /patients/' + req.params.patientId);
    })
    .put(auth,(req, res, next) => {
        Patients.findByIdAndUpdate(req.params.patientId, {
            $set: req.body
        }, { new: true })
            .then((patient) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(patient);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(auth,(req, res, next) => {
        Patients.findByIdAndRemove(req.params.patientId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = patientsRouter;