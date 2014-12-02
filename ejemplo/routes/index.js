
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};

exports.index = function( req, res ){
        var user = { nombre: "Juan Carlos",
                     apell1: "Calvo",
                     apell2: "Dominguez"
                    };
        res.render( 'index', {title: "Titulo", user: user} );
};

