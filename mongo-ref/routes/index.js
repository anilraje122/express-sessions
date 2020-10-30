var express = require('express');
var router = express.Router();

//Import the Seller Model
const Seller = require('../models/seller');

/* GET All Seller Profiles. */
router.get('/', async (req, res, next) => {
  try {
    const sellersData = await Seller.find({});
    res.json({ sellersData });
  } catch (err) {
    res.send(err);
  }
});


/* Create a Seller Profile */

router.post('/', async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.json({ seller });
  } catch (err) {
    res.send(err);
  }
});



module.exports = router;
