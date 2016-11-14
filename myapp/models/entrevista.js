"use strict";

module.exports = function (sequelize,DataTypes) {
    var Entrevista = sequelize.define("Entrevista", {
        urlEntrevista: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Entrevista.hasMany(models.Llamada)

            }
        }
    });

    return Entrevista;
}
