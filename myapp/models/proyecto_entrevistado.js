"use strict";
var Sequelize = require('sequelize');
module.exports = function (sequelize,DataTypes) {
    var Proyecto_Entrevistado = sequelize.define("Proyecto_Entrevistado", {
    }, {
        classMethods: {
            associate: function (models) {
                Proyecto_Entrevistado.belongsTo(models.Proyecto, {
                    onDelete: "CASCADE",
                    foreignkey: {
                        allowNull: false
                    }
                });
                Proyecto_Entrevistado.belongsTo(models.Entrevistado, {
                    onDelete: "CASCADE",
                    foreignkey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Proyecto_Entrevistado;
}