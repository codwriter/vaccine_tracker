const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Hospitals = require('../../models/hospital');
const User = require('../../models/user');

const hospitalRouter = express.Router();

hospitalRouter.use(express.json());

hospitalRouter.route('/')
    .get(auth, (req, res, next) => {
        Hospitals.find(req.query)
            .populate('user', 'email')
            .then((hospital) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(hospital);
            }, (err) => next(err))
            .catch((err) => {
                res.status(500).send('Server Error');
                next(err)
            });
    })
    .post(auth,
        check('name', 'Name of Hospital is required').notEmpty(),
        check('afm')
            .isLength({ min: 9, max: 9 })
            .withMessage('Afm must be 9 numbers')
            .matches(/^[0-9]+$/)
            .withMessage('Is not an afm type')
            .notEmpty()
            .withMessage('AFM of Hospital is required'),
        check('address', 'Address of Hospital is required').notEmpty(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            req.body.user = req.user.id;
            Hospitals.create(req.body)
                .then((hospital) => {
                    console.log("The Hospital created", hospital);
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


hospitalRouter.route('/profile')
    .get(auth, (req, res, next) => {
        Hospitals.findOne({ user: req.user.id })
            .then((hospital) => {
                if (hospital == null) {
                    res.statusCode = 400;
                    res.end("The profile has not been created!")
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(hospital);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /hospitals/');
    })
    .put(auth, check('name', 'Name of Hospital is required').notEmpty(),
        check('afm')
            .isLength({ min: 9, max: 9 })
            .withMessage('Afm must be 9 numbers')
            .matches(/^[0-9]+$/)
            .withMessage('Is not an afm type')
            .notEmpty()
            .withMessage('AFM of Hospital is required'),
        check('address', 'Address of Hospital is required').notEmpty(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            Hospitals.findOneAndUpdate({ user: req.user.id }, {
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
        Hospitals.findOneAndRemove({ user: req.user.id })

            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = hospitalRouter;