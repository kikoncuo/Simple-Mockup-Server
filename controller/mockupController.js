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
    console.log('Creating endpoint');
    var body = req.body;
    if (body.endpoint && body.response) {
      petitions.set(body.endpoint, body.response);
      var toStore = util.inspect(JSON.stringify(body)).replace('\'','');
      toStore = toStore.substring(0, toStore.length - 1);
      fs.appendFileSync('./httpPetitions.json', toStore + '\n' , 'utf-8');
      res.send('Petition created on endpoint ' + body.endpoint);
      console.log('Petition created, endpoint is: ' + body.endpoint);
      console.log('Response will be: ');
      console.log(body.response);
    }else{
      console.log('ERROR: Not valid json, 2 fields needed, endpoint and response');
      res.send('ERROR: Not valid json, 2 fields needed, endpoint and response');
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.dynamicAPI = function(req, res) {
    try {
      var body = res.json(petitions.get(req.params.petitionName));
      if (body)
        res.json(body);
      else
        res.json('"Error":"Endpoint not created"');
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
