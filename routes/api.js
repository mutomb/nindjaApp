const express= require('express');
//routing middleware; facilitate route creation, no need to add /api to all routes
const router= express.Router();
const Nindja = require('../models/nindja');

//get all objects
router.get('/nindjas', function(req, res, next) {
	/*Nindja.find({}).then(function(objs) {
		res.send(objs);
	})*/
	Nindja.aggregate([
   {
     $geoNear: {
        near: { type: "Point", coordinates: [ parseFloat(req.query.lat) , parseFloat(req.query.lng) ] },
        distanceField: "dist.calculated",
        maxDistance: 1000000000,
        spherical: true
     }
   }
]).then(function(objs) {
		res.send(objs);
	}).catch(next);
});
//add new object
router.post('/nindjas', function(req, res, next) {
	//var newNinja= new Nindja(req.body); //creates object
	//nindja.save(); //save object
	Nindja.create(req.body).then(function(createdObj) {
		res.send(createdObj);
	}).catch(next);
});
//update old object
router.put('/nindjas/:id', function(req, res, next) {
	Nindja.findByIdAndUpdate({ _id: req.params.id}, req.body).then(function(unchangedObj) {
		Nindja.findOne({ _id: req.params.id }).then(function(changedObj) {
			res.send(changedObj);
		}).catch(next);
	}).catch(next);
});
//romove object
router.delete('/nindjas/:id', function(req, res, next) {
	Nindja.findByIdAndRemove({ _id:req.params.id }).then(function(removedObj) {
		res.send(removedObj);
	}).catch(next);
});

module.exports= router;