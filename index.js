var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Mongoose = require('mongoose');

app.use(express.static('.'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

Mongoose.connect('mongodb://localhost/crudDB');

var Persons = Mongoose.model('persons', {
		firstname: String,
		lastname: String
}, 'persons');

app.get('/persons', function(req, res){
	Persons.find({}, function(err, data){
		if (err)
			console.log(err);
		res.json(data);
	});
});

app.post('/persons', function(req, res){
	
	Persons.create({firstname: req.body.firstname.text, lastname: req.body.lastname.text, done: false}, function(err, data) {
		if (err)
			console.log(err);
		Persons.find({}, function(err, data){
			if (err)
				console.log(err);
			res.json(data);
		});
	});
});

app.delete('/persons/:person_id', function(req, res){
	Persons.remove({_id: req.params.person_id}, function(err, data){
		if(err)
			console.log(err);
		Persons.find({}, function(err, data){
			if (err)
				console.log(err);
			res.json(data);
		});
	});
});

app.put('/persons', function(req, res){
	Persons.update({_id: req.body._id},
		{firstname: req.body.firstname.text, lastname: req.body.lastname.text, done: false},
		function(err, data){
			if(err)
				console.log(err);
			Persons.find({}, function(err, data){
				if (err)
					console.log(err);
				res.json(data);
			});
	});
});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
console.log("Server started at Port 3000");