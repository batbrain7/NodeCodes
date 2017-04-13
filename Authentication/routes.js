var model = require('./server');

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

    app.use('/api',apiRoutes);

  }
}
