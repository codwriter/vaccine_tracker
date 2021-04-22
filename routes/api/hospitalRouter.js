const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');

const Hospitals = require('../../models/hospital');

const hospitalRouter = express.Router();

hospitalRouter.use(express.json());

hospitalRouter.route('/')
    .get(auth, (req, res, next) => {
        Hospitals.find(req.query)
            .populate('hospital.user')
            .then((hospital) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(hospital);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth, (req, res, next) => {
        req.body.user = req.user.id
        Hospitals.create(req.body)
            .then((hospital) => {
                console.log("The Hospital created", hospital);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(hospital);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(auth, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /hospitals');
    })
    .delete(auth, (req, res, next) => {
        Hospitals.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

hospitalRouter.route('/:HospitalId')
    .get(auth, (req, res, next) => {
        Hospitals.findById(req.params.hospitalId)
            .then((hospital) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hospital);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /hospitals/' + req.params.hospitalId);
    })
    .put(auth, (req, res, next) => {
        Hospitals.findByIdAndUpdate(req.params.patientId, {
            $set: req.body
        }, { new: true })
            .then((hospital) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(hospital);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(auth, (req, res, next) => {
        Hospitals.findByIdAndRemove(req.params.hospitalId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = hospitalRouter;