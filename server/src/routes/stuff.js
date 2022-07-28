const express = require('express');
const auth = require('../middleware/auth');
const ctrl = require('../controllers/stuff');
const router = express.Router();

router.get('/', auth, ctrl.getThing);

router.post('/', auth, ctrl.createThing);

router.get('/:id', auth, ctrl.getOneThing);

router.put('/:id', auth, ctrl.updateOneThing);

router.delete('/:id', auth, ctrl.deleteOneThing);

module.exports = router;
