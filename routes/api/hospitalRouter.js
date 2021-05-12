const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Hospitals = require('../../models/hospital');
const User = require('../../models/user');


const hospitalRouter = express.Router();

hospitalRouter.use(express.json());

// @route    GET api/hospital/me
// @desc     Get Hospital that is linked to user
// @access   Private
hospitalRouter.get('/me', auth, async (req, res) => {
    try {
        const hospital = await Hospitals.findOne({
            id: req.user.hospital
        });
        console.log(req.user);
        if (!hospital) {
            return res.status(400).json({ msg: 'There is no hospital linked to this user' });
        }
        res.json(hospital);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/hospital/
// @desc     Get All hospitals or with a query
// @access   Private
hospitalRouter.get('/', auth, async (req, res) => {
    try {
        const hospitals = await Hospitals.find(req.query);
        if (!hospitals) {
            return res.status(400).json({ msg: 'There are no hospitals' });
        }
        res.json(hospitals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

// @route   Post api/hospital/
// @desc    Post a new Hospital
// @access   Private
hospitalRouter.post('/', auth,
    check('name', 'Name of Hospital is required').notEmpty(),
    check('afm')
        .isLength({ min: 9, max: 9 })
        .withMessage('Afm must be 9 numbers')
        .matches(/^[0-9]+$/)
        .withMessage('Is not an afm type')
        .notEmpty()
        .withMessage('AFM of Hospital is required'),
    check('address', 'Address of Hospital is required').notEmpty(),
    check('city', 'City of the Hospital is required').notEmpty(),
    check('country', 'Country of the Hospital is required').notEmpty(),
    check('vaccines', 'Vaccines of the Hospital is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, afm, address, city, country, vaccines, ...rest } = req.body;
        try {
            let Hospital = await Hospitals.findOne({ afm: req.body.afm });
            if (Hospital) {
                return res.status(400).json({ errors: [{ msg: 'Hospital already exists' }] });
            }


            const hospitalFields = {
                name, afm, address, city, country, vaccines
            };
            console.log(hospitalFields);
            let hospital = await Hospitals.create(hospitalFields);

            //Insert in User Hospital ID if exist replace it with new.
            let user = await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $set: { hospital: hospital.id } },
                { new: true }
            );

            res.json(hospital);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

// @route   delete api/hospital/
// @desc    Delete all hospitals
// @access   Private
hospitalRouter.delete('/', auth, async (req, res) => {
    try {
        const resp = await Hospitals.remove();
        console.log(resp);
        res.json({ msg: "Hospitals deleted: " + resp.deletedCount });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   put api/hospital/unlink
// @desc    Unlink from a Hospital
// @access   Private
hospitalRouter.put('/unlink', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $set: { hospital: null } },
            { new: true }
        );
        res.json({ msg: "User is unlinked from the hospital" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   put api/hospital/link
// @desc    Link to an existing  Hospital
// @access   Private
hospitalRouter.put('/link', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $set: { hospital: req.body.hospitalID } },
            { new: true }
        );
        res.json({ msg: "User is now linked!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// @route   put api/hospital/me
// @desc    Edit hospital that is linked to the user
// @access   Private
hospitalRouter.put('/me', auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password -privateKey -publicKey');
            let hospital = await Hospitals.findByIdAndUpdate({ _id: user.hospital }, {
                $set: req.body
            }, { new: true })

            res.status(200).json(hospital);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

hospitalRouter.route('/vaccines')
    // @route    Get api/hospital/vaccines
    // @desc     Get hospital vaccines
    // @access   Private
    .get(auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password -privateKey -publicKey');
            const hospital = await Hospitals.findById({ _id: user.hospital });

            res.json(hospital.vaccines);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })
    // @route    PUT api/hospital/vaccines
    // @desc     Add hospital vaccines
    // @access   Private
    .put(auth,
        check('vaccineBrand', 'Vaccine Brand is required').notEmpty(),
        check('doses', 'Doses of the vaccine is required').notEmpty(),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                const user = await User.findById(req.user.id).select('-password -privateKey -publicKey');
                const hospital = await Hospitals.findById({ _id: user.hospital });
                console.log(hospital);
                hospital.vaccines.unshift(req.body);

                await hospital.save();

                res.json(hospital);
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
    );

// @route    get api/hospital/vaccines/:vac_id
// @desc     get vaccine from hospital
// @access   Private
hospitalRouter.route('/vaccines/:vac_id')
    .get(auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password -privateKey -publicKey');
            const hospital = await Hospitals.findById({ _id: user.hospital });

            res.json(hospital.vaccines.id(req.params.vac_id));

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })
    // @route    put api/hospital/vaccines/:vac_id
    // @desc     Edit vaccine from hospital
    // @access   Private
    .put(auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password -privateKey -publicKey');
            const hospital = await Hospitals.findById({ _id: user.hospital });

            if (req.body.vaccineBrand)
                hospital.vaccines.id(req.params.vac_id).vaccineBrand = req.body.vaccineBrand;
            if (req.body.doses)
                hospital.vaccines.id(req.params.vac_id).doses = req.body.doses;

            await hospital.save();
            
            res.status(200).json(hospital.vaccines.id(req.params.vac_id));

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

    // @route    DELETE api/hospital/vaccines/:vac_id
    // @desc     Delete vaccines from hospital
    // @access   Private
    .delete(auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password -privateKey -publicKey');
            const foundHospital = await Hospitals.findById({ _id: user.hospital });

            foundHospital.vaccines = foundHospital.vaccines.filter(
                (vac) => vac._id.toString() !== req.params.vac_id
            );

            await foundHospital.save();
            return res.status(200).json(foundHospital);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

module.exports = hospitalRouter;