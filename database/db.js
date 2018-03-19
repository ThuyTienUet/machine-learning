'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var sequelize = new Sequelize("machine-learning", "root", "", {
    dialect: 'sqlite',
    storage: './machine-learning.sqlite'
});

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

sequelize.sync()
    .then(() => {
        console.log('sync success');
    })
    .catch(err => {
        console.log('sync err');
    });

var models = sequelize.models;

db.sequelize = sequelize;

module.exports = db;