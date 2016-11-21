/**
 * Created by daryl on 11/21/16.
 */
var fs = require('fs');

fs.readdir('/home/daryl/Desktop/inf236_cati/Plantilla_meh/public/audio', function (err, files) {
    if(err) return console.log("La carpeta no existe");
    files.forEach(function (f) {
        console.log(f);
    });
    return console.log(files);
});