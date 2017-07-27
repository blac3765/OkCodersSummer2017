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
	return Counter.find().exec().then(function(counter){
		if(!counter) {
			counter = new Counter({count:0});
			return counter.save();
		}
	});
}

function incrementCounter() {
	return getCounter().then(function(counter){
		counter.count++;
		return counter.save();
	});
}

incrementCounter().then(function(counter){
	console.log('This program has been run ', counter.count, 'times!')
});
