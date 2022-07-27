const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/stuff')

router.get('/', ctrl.getThing);

router.post('/', ctrl.createThing);

router.get('/:id', ctrl.getOneThing);

router.put('/:id', ctrl.updateOneThing);

router.delete('/:id', ctrl.deleteOneThing);

module.exports = router;
