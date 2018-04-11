'use strict';
var util = require('util');
var fs=require("fs");
var readline = require('readline');
var petitions = new Map();

exports.exampleAPI = function(req, res) {
    var jsonText =  '{ "employees" : [' +
                    '{ "firstName":"John" , "lastName":"Doe" },' +
                    '{ "firstName":"Anna" , "lastName":"Smith" },' +
                    '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
    res.json(JSON.parse(jsonText));
};

exports.listEndpoints = function(req, res) {
  console.log('Endpoints:');
  console.log(Array.from( petitions.keys() ));
  res.json(Array.from( petitions.keys() ));
};


exports.createEndpoint = function(req, res) {
  try {
    var endpointName;
    var endpointRes;
    if (req.params.endpointName) {
      petitions.set(req.params.endpointName, req.body);
      var savedPetition = {};
      savedPetition.endpoint = req.params.endpointName;
      endpointName = req.params.endpointName;
      savedPetition.response = req.body;
      endpointRes = req.body;
      var toStore = util.inspect(JSON.stringify(savedPetition)).replace('\'','');
    }else{
      var body = req.body;
      if (body.endpoint && body.response) {
        petitions.set(body.endpoint, body.response);
        endpointName = body.endpoint;
        endpointRes = body.response;
        var toStore = util.inspect(JSON.stringify(body)).replace('\'','');
      }else{
        res.status(403);
        console.log('ERROR: Not valid json, 2 fields needed, endpoint and response');
        res.send('ERROR: Not valid json, 2 fields needed, endpoint and response');
      }
    }
    toStore = toStore.substring(0, toStore.length - 1);
    fs.appendFileSync('./httpPetitions.json', toStore + '\n' , 'utf-8');
    res.send('Petition created on endpoint ' + endpointName);
    console.log('Petition created, endpoint is: ' + endpointName);
    console.log('Response will be: ');
    console.log(endpointRes);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send(e);
  }
};

exports.dynamicAPI = function(req, res) {
    try {
      var body = petitions.get(req.params.endpointName);
      if (body)
        res.json(body);
      else{
        res.status(404);
        res.json('"Error":"Endpoint not created"');
      }
    } catch (e) {
      res.send(e);
    }
};

exports.loadPetitions = function() {
  try{
    var rd = readline.createInterface({
    input: fs.createReadStream('./httpPetitions.json'),
    output: false,
    console: false
    });
    rd.on('line', function(line) {
      if (line != "" || !undefined || !'\n') {
        try {
          var obj = JSON.parse(line);
          petitions.set(obj.endpoint, obj.response);
        } catch (e) {
          console.log('Error reading a line from httpPetitions file');
          console.log(e);
        }
      }
    });
  } catch (e){
    console.log(e);
  }
};
