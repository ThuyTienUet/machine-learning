'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var sequelize = new Sequelize("wipm", "root", "", {
    dialect: 'sqlite',
    storage: './database/wipm.sqlite'
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
// var model = {
//     id: 'r',
//     name: 'rnd',
//     type: 'rnd',
//     dims_input: 4,
//     units: JSON.stringify([{n_nodes: 8, activate: "sigmoid"}]),
//     params: JSON.stringify({n_epochs: 10, learning_rate: 0.001, feature_range: [0,1], batch_size: 10}),
//     data: JSON.stringify([[5,4,6],[5,4,3]]),
//     target: JSON.stringify([4,5]),
//     mse: 0.345,
//     description: 'asdf'
// }
// models.Model.create(model)
//     .then(md=>{
//         console.log('asdf',md);
//     })
//     .catch(e=>{
//         console.log(e);
//     })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;