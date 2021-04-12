const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const Vaccines = require('../models/vaccine');

const vaccineRouter = express.Router();

vaccineRouter.use(express.json());

vaccineRouter.route('/')
    .get((req, res, next) => {
        Vaccines.find({})
            .then((vaccine) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Vaccines.create(req.body)
            .then((vaccine) => {
                console.log("The vaccine created", vaccine);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /vaccine');
    })
    .delete((req, res, next) => {
        Vaccines.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


vaccineRouter.route('/:vaccineId')
    .get((req, res, next) => {
        Vaccines.findById(req.params.vaccineId)
            .then((vaccine) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /patients/' + req.params.vaccineId);
    })
    .put((req, res, next) => {
        Vaccines.findByIdAndUpdate(req.params.vaccine, {
            $set: req.body
        }, { new: true })
            .then((vaccine) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Vaccines.findByIdAndRemove(req.params.vaccineId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = vaccineRouter;