var argv = require('minimist')(process.argv.slice(2));
var extend = require('util')._extend;
var express = require('express');
var app = express();
var fs = require('fs');

var config = {
    port: 80,
    theme: 'hackers',
    pathToList: function () {
        return 'themes/' + this.theme + '.json';
    },
    urlList: function () {
        return JSON.parse(fs.readFileSync(config.pathToList()));
    }
};

extend(config, argv);

var getRandomUrl = function () {
    return config.urlList()[Math.round(Math.random() * (config.urlList().length - 1))];
};

app.get('*', function (req, res) {
    res.set('Location', getRandomUrl());
    res.sendStatus('302');
});

app.listen(config.port, function () {
    console.log('Listening on port ' + config.port + ' with theme ' + config.theme);
});