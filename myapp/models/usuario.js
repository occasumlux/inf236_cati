"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define("Usuario", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        nombre: DataTypes.STRING,
        email: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
        nro_fono: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Usuario.hasMany(models.Rol)
                //Usuario.hasMany(models.llamada)
            }
        }
    });

    return Usuario;
};
