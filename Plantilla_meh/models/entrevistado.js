/**
 * Created by daryl on 11/17/16.
 */
"use strict";
var Sequelize = require('sequelize');
module.exports = function (sequelize,DataTypes) {
    var Entrevistado = sequelize.define("Entrevistado", {
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        nro_fono: DataTypes.STRING,
        por_llamar: DataTypes.STRING
    });

    return Entrevistado;
};