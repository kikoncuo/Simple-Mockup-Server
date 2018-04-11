#!/usr/bin/env node

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  controller = require('./controller/mockupController');
  port = process.env.PORT || 3001;

//Rest server config and start
app.use(express.static(__dirname + '/client')); //To define what folder is the public directort
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/routes');
routes(app);

app.listen(port);
controller.loadPetitions();
console.log('Mockup RESTful API server started on: ' + port);
