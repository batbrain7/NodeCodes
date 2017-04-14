var model = require('./server');
var jwt = require('jsonwebtoken');
var User = require('./app/models/user');

module.exports = {
  configure:function(apiRoutes,app) {

    apiRoutes.get('/',function(req,res) {
      res.json({message:'This is my house bitches'});
    });

    apiRoutes.get('/users',function(req,res) {
      User.find({},function(err,users) {
        res.json(users);
      });
    });

    apiRoutes.post('/authenticate',function(req,res) {

        User.findOne({name: req.body.name},function(err,user) {
          if(err) throw err;

          console.log(req.body.name);
          if(!user) {
            res.json({success : false,message : 'Authentication failed.User not found.'});
          } else if (user) {
            if(user.password!=req.body.password) {
              res.json({success:false,message : 'Authentication failed. Passwords do not match.'});
            } else {
              var token = jwt.sign(user,app.get('secret'),{
                  expiresIn : 60*60*24
              });

              res.json({
                success : true,
                message:'Suck it up Bitch',
                token : token
              });
            }
          }
        });
    });

    apiRoutes.use(function(req,res,next) {

      var token = req.body.token||req.query.token||req.headers['x-access-token'];

      if(token) {
          jwt.verify(token,app.get('secret'),function(err,decoded) {
            if(err) {
              return res.json({success:false,message:'Failed to authenticate the token.'});
            } else {
              req.decoded = decoded;
              next();
            }
          });
      } else {
        return res.status(403).send({
          success:false,
          message:'No token provided'
        })
      }
    });

    app.use('/api',apiRoutes);

  }
}
