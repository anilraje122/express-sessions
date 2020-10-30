var express = require('express');
var router = express.Router();

//Import Car Model
const Car = require('../models/car');
const Seller = require("../models/seller");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//Create a Car Profile
router.post("/:sid", async (req, res) => {
  try {

    const sid = req.params.sid;
    const car = new Car(req.body);
    //Fetch the Seller 
    const seller = await Seller.findById(sid);
    car.seller = seller;
    await car.save();
    seller.cars.push(car);
    await seller.save();
    res.json({ Success: "Car Sold to the given seller ID" });

  } catch (err) {
    res.send(err);
  }
});


//Fetching Seller Profile
// We need sid
router.get("/:sid", async (req, res) => {
  try {
    const sid = req.params.sid;
    const sellerData = await Seller.findById(sid).populate('cars', 'model year -_id');
    res.json({ sellerData });

  } catch (err) {
    res.send(err);
  }
})





module.exports = router;
