"use strict";
module.exports = function (sequelize,DataTypes) {
    var Entrevista = sequelize.define("Entrevista", {
        url: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Entrevista.belongsTo(models.Proyecto, {
                    onDelete: "CASCADE",
                    foreignkey: {
                        allowNull: false
                    }
                });
                Entrevista.hasMany(models.Llamada)
            }
        }
    });

    return Entrevista;
}