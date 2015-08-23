'use strict';

var express = require('express');
var path = require('path');

var dist = path.resolve(__dirname, '..', 'dist');

var config;
var instance;

function App() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  instance = express();

  require('./config/express')(instance);
}

App.prototype = {
  useConfiguration: function(newConfig) {
    console.log('conf');
    config = newConfig;
  },

  start: function() {
    var port = config.getPort();

    instance.use(express.static(dist));

    instance.get('*', function(req, res) {
      res.sendFile(path.join(dist, 'index.html'), {
        root: __dirname
      });
    });

    instance.listen(port, function() {
      console.log('Express server listening on %d, in %s mode', port, instance.get('env'));
    });
  }
};

module.exports = App;
