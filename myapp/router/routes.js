module.exports = function(app, passport) {
    var fs = require('fs');

    app.get('/', function(req, res) {
        res.redirect('/login');
    });

    app.get('/home', isLoggedIn, function (req, res) {
        res.render('index.html');
    });

    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.html', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
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

    app.get('/verUsuario', isLoggedIn, function (req, res) {
        res.render('VerUsuarios.html');
    });

    app.get('/crearUsuario', isLoggedIn, function (req, res) {
        res.render('CrearUsuario.html', {title: 'Registrar Usuarios'});
    });

    app.get('/agregarEncuestado', isLoggedIn, function (req, res) {
        res.render('AgregarEncuestado.html')
    });

    app.get('/verEncuestados', isLoggedIn, function (req, res) {
        res.render('VerEncuestados.html')
    });

    app.get('/verEncuesta/:id',isLoggedIn, function (req, res) {
        //var surveyID = req.params.id;
        res.render('VerEncuesta.html', {surveyID: req.params.id});
    });

    app.get('/Llamar',isLoggedIn, function (req, res) {
        res.render('Llamar.html');
    });

    app.get('/Subir',isLoggedIn, function (req, res) {
        res.render('subirArchivo.html');
    });

    app.get('/crearProyecto',isLoggedIn, function (req, res) {
        res.render('CrearProyecto.html');
    });

    app.get('/crearEncuesta',isLoggedIn, function (req, res) {
        res.render('CrearEncuesta.html');
    });

    app.get('/verEncuestas',isLoggedIn, function (req, res) {
        res.render('VerEncuestas.html');
    });
    app.get('/verAudios', isLoggedIn, function (req, res) {
        res.render('VerAudios.html');
    });

    app.get('/verListaArchivos', function (req, res) {
        fs.readdir(__dirname+"/../audios" ,
            function (err, files) {
                if (err){
                    return res.send("La carpeta no existe");
                }
                res.send(files)
            });
    });

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}