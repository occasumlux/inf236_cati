"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define("Usuario", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        nombre: DataTypes.STRING,
        email: DataTypes.STRING,
        //admin: DataTypes.BOOLEAN,
        nro_fono: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Usuario.hasOne(models.Rol);
                Usuario.hasMany(models.Llamada);
            }
        }
    });

    return Usuario;
};
