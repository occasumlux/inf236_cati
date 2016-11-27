"use strict";

module.exports = function (sequelize,DataTypes) {
    var Llamada = sequelize.define("Llamada", {
        estado: DataTypes.BOOLEAN,
        fecha_hora: DataTypes.DATEONLY
    }, {
        classMethods: {
            associate: function (models) {
                Llamada.belongsTo(models.Usuario, {
                    onDelete: "CASCADE",
                    foreignkey: {
                        allowNull: false
                    }
                });
                Llamada.belongsTo(models.Entrevistado, {
                    onDelete: "CASCADE",
                    foreignkey: {
                        allowNull: false
                    }
                });
                Llamada.belongsTo(models.Entrevista, {
                    onDelete: "CASCADE",
                    foreignkey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Llamada;
};