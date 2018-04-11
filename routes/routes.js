'use strict';
module.exports = function(app) {
  var mockupController = require('../controller/mockupController');

  app.route('/example')
    .get(mockupController.exampleAPI);

  app.route('/listEndpoints')
    .get(mockupController.listEndpoints);

  app.route('/customEndpoints/:petitionName/:parameter')
    .get(mockupController.dynamicAPI)
    .post(mockupController.dynamicAPI)
    .put(mockupController.dynamicAPI)
    .delete(mockupController.dynamicAPI);

  app.route('/customEndpoints/:petitionName')
    .get(mockupController.dynamicAPI)
    .post(mockupController.dynamicAPI)
    .put(mockupController.dynamicAPI)
    .delete(mockupController.dynamicAPI);

  app.route('/createEndpoint')
    .post(mockupController.createEndpoint);

  // app.route('/Accounts/:accountId') //Endpoint example with variable
  //   .get(mockupController.read_a_account)
  //   .put(mockupController.edit_account)
  //   .patch(mockupController.edit_account)
  //   .delete(mockupController.delete_a_account);

};
