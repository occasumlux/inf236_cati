"use strict";
var Sequelize = require('sequelize');
module.exports = function (sequelize,DataTypes) {
    var Proyecto = sequelize.define("Proyecto", {
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Proyecto.hasMany(models.Entrevista);
                Proyecto.hasMany(models.Proyecto_Entrevistado);
            }
        }
    });

    return Proyecto;
}