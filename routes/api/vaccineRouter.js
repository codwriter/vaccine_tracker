const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const Vaccines = require('../../models/vaccine');

const vaccineRouter = express.Router();

vaccineRouter.use(express.json());

vaccineRouter.route('/')
    .get(auth,(req, res, next) => {
        Vaccines.find({})
            .then((vaccine) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth,(req, res, next) => {
        Vaccines.create(req.body)
            .then((vaccine) => {
                console.log("The vaccine created", vaccine);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(auth,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /vaccine');
    })
    .delete(auth,(req, res, next) => {
        Vaccines.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

vaccineRouter.route('/:vaccineId')
    .get(auth,(req, res, next) => {
        Vaccines.findById(req.params.vaccineId)
            .then((vaccine) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /patients/' + req.params.vaccineId);
    })
    .put(auth,(req, res, next) => {
        Vaccines.findByIdAndUpdate(req.params.vaccineId, {
            $set: req.body
        }, { new: true })
            .then((vaccine) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(vaccine);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(auth,(req, res, next) => {
        Vaccines.findByIdAndRemove(req.params.vaccineId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = vaccineRouter;