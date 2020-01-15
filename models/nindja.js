var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//geolocation schema
var GeoSchema = new Schema({
	type: {
		type: String,
		default: "Point"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});

var NindjaSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name is required!']
	},
	rank: String,
	available: {
		type: Boolean,
		default: false
	}, 
	geometry: GeoSchema //nested schema
});

var Nindja = mongoose.model('nindja', NindjaSchema);
 
module.exports = Nindja;