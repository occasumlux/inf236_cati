var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
var models  = require('../models');
// en este .js se encaminan las solicitudes a la bd

//Return router
module.exports = router;
//GET usuarios
router.get('/usuarios', function(req, res, next) {
	try {
		models.Usuario.findAll().then(function (users) {
            res.json(users)
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});
//GET un usuario con id determinado
router.get('/usuarios/:id', function(req, res, next) {
	try {
		console.log(req.params.id);
		models.Usuario.find(({where: {id: req.params.id} })).then(function (user) {
			res.json(user);
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});
//POST crear usuario
router.post('/usuarios', function(req,res,next){
	try{
		console.log(req.body.permiso);
		var resultado=[];
		models.Usuario.create({
			username: req.body.username,
			password: req.body.password,
			name: req.body.password,
			email: req.body.email,
			nro_fono: req.body.number
		}).then(function (user) {
			models.Rol.create({
				permiso: req.body.permiso,
				UsuarioId: user.id
			}).then(function (rol) {
				resultado.push(user);
				resultado.push(rol);
				res.json(resultado);
			});
		});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});
router.put('/usuarios/:id', function(req,res,next){
	try{

		models.Usuario.findOne({ where: {id:req.params.id} }).then(function (user) {
			//for(var x=0;x<user.length;x++){
			//console.log(user.username);
			if(req.body.username){
				if(req.body.email) {
					user.updateAttributes({
						username: req.body.username,
						email: req.body.email
					}).then(function (result) {
						res.json(result);
					})
				}
				else {
					user.updateAttributes({
						username: req.body.username
					}).then(function (result) {
						res.json(result);
					})
				}

			}
		});
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});
router.delete('/usuarios/:id', function(req,res,next){
	try{
		models.Usuario.destroy({where: {id: req.params.id} }).then(function () {
			return models.Usuario.findAll().then(function (users) {
				res.json(users);
			})
		})
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});
// agrega entrevistado a BD
router.post('/entrevistado', function(req,res,next){
	try{
		//console.log(req.body.permiso);
		var resultado=[];
		models.Entrevistado.create({
			nombre: req.body.nombre,
			nro_fono: req.body.number,
			edad: req.body.edad,
			direccion: req.body.direccion,
			estado: req.body.estado
		}).then(function (entrevistado) {
				resultado.push(entrevistado);
				res.json(resultado);
		});
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

router.get('/encuestados', function(req, res, next) {
	try {
		models.Entrevistado.findAll().then(function (Entrevistados) {
			res.json(Entrevistados)
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});

router.post('/proyecto', function (req, res, next) {
	try{
		var resultado=[];
		models.Proyecto.create({
			nombre: req.body.form.nombre,
			descripcion: req.body.form.descripcion
		}).then(function (proyecto) {
			var i;
			for(i=0; i<req.body.selec.length; i++){
				models.Proyecto_Entrevistado.create({
					EntrevistadoId: req.body.selec[i],
					ProyectoId: proyecto.id
				}).then(function (proyecto_entrevistado) {
					resultado.push(proyecto_entrevistado);
				});
			}
			resultado.push(proyecto);
			res.json(proyecto);
		});
	} catch(ex){
		console.error("Internal eror:"+ex);
		return next(ex);
	}
});
//GET projects
router.get('/projects', function(req, res, next) {
    try {
        models.Proyecto.findAll().then(function (projects) {
            res.json(projects)
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//POST crear entrevista
router.post('/survey', function(req,res,next){
    try{
        var resultado=[];
        models.Entrevista.create({
            url: req.body.url,
            name: req.body.name,
            ProyectoId: req.body.project
        }).then(function (survey) {
            resultado.push(survey);
            res.json(resultado);
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

//GET surveys
router.get('/surveys', function(req, res, next) {
    try {
        models.Entrevista.findAll().then(function (surveys) {
            res.json(surveys)
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//GET one survey
router.get('/survey/:id', function(req, res, next) {
    try {
        console.log(req.params.id);
        models.Entrevista.find(({where: {id: req.params.id} })).then(function (survey) {
            res.json(survey);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
