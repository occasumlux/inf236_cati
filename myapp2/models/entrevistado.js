"use strict";
var Sequelize = require('sequelize');
module.exports = function (sequelize,DataTypes) {
    var Entrevistado = sequelize.define("Entrevistado", {
        nombre: DataTypes.STRING,
        edad: DataTypes.INTEGER,
        direccion: DataTypes.STRING,
        nro_fono: DataTypes.INTEGER,
        estado: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Entrevistado.hasMany(models.Llamada);
                Entrevistado.hasMany(models.Proyecto_Entrevistado);
            }
        }
    });

    return Entrevistado;
}