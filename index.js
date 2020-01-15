const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app= express();

//locally
//mongoose.connect('mongodb://locahost/ninjaApp');
//mongoose.Promise = global.Promise; //needed because mongodb Promise is deprecated
//run service mongodb start or service mongodb stop or service mongodb restart or service mongodb status
//remotely //OR run mongo "mongodb+srv://todoappcluster-qsbgu.mongodb.net/test"  --username tempUsername
mongoose.connect("mongodb+srv://temp:temp@cluster0-j1vkj.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true },function(err) {
	if(err) throw err;
	console.log('connected');
})
//1, static files handler middleware
app.use(express.static('public'));  //servers any /file routes; root / always servers public/index.html

//2, request body hanlder middleware
app.use(bodyParser.json()); //tell it to parse json only

//3, route handler middleware
app.use('/api',require('./routes/api'));

//4, error handler middleware
app.use(function(err, req, res, next) {
	//console.log(err);
	res.status(422).send({error: err.message});
})

app.listen( process.env.PORT || 4000, function() { //process.env.port == hosting service choosen port
	console.log('listen for requests'+4000)
});