var express = require('express');					// Import express
var bodyParser = require('body-parser');			// We use bodyParser to parse POST requests
var mongoose = require('mongoose');					// Import mongoose

mongoose.Promise = Promise;							// Set the default Promise handler to the global ES6 Promise.
mongoose.connect('mongodb://localhost/okcoders', {	// Connect to the local MongoDB instance and use 'okcoders' as the database.
	useMongoClient: true
});

var Counter = mongoose.model('Counter', {
	count: Number,
	name: String
});

function getCounter(counterName){
	return Counter.findOne({name: counterName}).exec().then(function(counter){
		if(!counter) {
			counter = new Counter({count:0, name: counterName);
			return counter.save();
		}
		return counter;
	});
}

getCounter('start');

getCounter('visits');

getCounter('returns');

function incrementCounter(counterName) {
	return getCounter(counterName).then(function(counter){
		counter.count++;
		return counter.save();
	});
}

incrementCounter('start').then(function(counter){
	console.log('Program has been started ', counter.count, 'times!')
});

incrementCounter('visits').then(function(counter){
	console.log('Program has been visited ', counter.count, 'times!')
});

incrementCounter('returns').then(function(counter){
	console.log('Visitors have returned ', counter.count, 'times!')
});
