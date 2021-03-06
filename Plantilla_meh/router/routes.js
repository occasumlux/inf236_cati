/**
 * Created by famancil on 21-08-16.
 */

module.exports = function(app, passport) {

    var fs = require('fs');

    app.get('/verArchivos/:id', isLoggedIn, function (req, res) {
        fs.readdir('/home/daryl/Desktop/inf236_cati/Plantilla_meh/public/audio', function (err, files) {
            if(err) return res.send("La carpeta no existe");
            return res.send(files);
        });
    });

    app.get('/', function (req, res) {
        res.redirect('/login');
        //res.render('index.html', {title: 'Mi primer Aplicacion Web'});
    });

    app.get('/home', isLoggedIn, function (req, res) {
        res.render('index.html');
    });

    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.html', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.html', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.html', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.get('/verUsuario',isLoggedIn, function (req, res) {
        res.render('VerUsuario.html');
    });

    app.get('/crearUsuario',isLoggedIn, function (req, res) {
        res.render('CrearUsuario.html', {title: 'Registrar Usuarios'});
    });

    app.get('/verEncuesta',isLoggedIn, function (req, res) {
        res.render('VerEncuesta.html');
    });

    app.get('/Llamar',isLoggedIn, function (req, res) {
        res.render('LlamarEncuestado.html');
    });

    app.get('/Subir',isLoggedIn, function (req, res) {
        res.render('SubirArchivo.html');
    });

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}