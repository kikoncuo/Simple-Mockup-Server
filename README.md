# Simple Mockup Server
A simple and light mockup server designed to emulate responses from http requests and test communication.

### Installation and execution

1. Install with : `npm install -g simple-mockup-server`
2. Execute with : `simple-mockup-server` (Port can be specified with PORT parameter, by default uses 3001)  `PORT=portN simple-mockup-server`


### Set simple requests

1. Create json file specifying the endpoint and the desired response response
```json
{
	"endpoint": "NewTestEndpoint",
	"response" : {
    	"TEST": [
	        {
	            "firstName": "John",
	            "lastName": "Doe"
	        },
	        {
	            "firstName": "Anna",
	            "lastName": "Smith"
	        },
	        {
	            "firstName": "Peter",
	            "lastName": "Jones"
	        }
	    ]
	}
}
```

2. Send a post petition to http://localhost:3001/createEndpoint with the specified json as body

2. (Alternative) Send a post petition to http://localhost:3001/createEndpoint/ENDPOINTNAME with the desired response in the body
```json
{
  	"TEST": [
        {
            "firstName": "John",
            "lastName": "Doe"
        },
        {
            "firstName": "Anna",
            "lastName": "Smith"
        },
        {
            "firstName": "Peter",
            "lastName": "Jones"
        }
    ]
}
```

### Access created endpoints
1. To list all the requests endpoints: http://localhost:3001/listEndpoints
2. Execute any petition type to http://localhost:3001/customEndpoints/ENDPOINTNAME to get the specified response

### Alternative way to set and edit simple requests

1. Open file httpPetitions.json
2. Edit/add/delete any requests (All requests must be in one line with the same structure as before)


### Instructions to add functions with logic to the default configuration

1. Create function in /controller/mockupController.js
2. Set endpoint location in /routes/routes.js

### Next steps

1. Add similar functionality for websockets
