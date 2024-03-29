
/**
 * Module dependencies.
 */
var TwitterWorker = require('./workers/twitter.js');
//var io = require('socket.io');
var redis = require('redis');
var ejs = require('ejs');
var express = require('express')
  , routes = require('./routes');

var terms = ['awesome', 'cool', 'rad', 'gnarly', 'groovy'];



var t = new TwitterWorker(terms);

//this redis client listens for messages
var listener = redis.createClient();

var app = module.exports = express.createServer();

listener.keys('*', function(err,keys){
  listener.mget(keys, function(err, values){   
    keys.forEach(function(key){
 //   console.log(keys);
    
  });
  });
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

  client.mget(['awesome','cool', 'rad', 'gnarly','groovy'], function(error, responses){
  		res.writeHead(200,{'Content-Type': 'text/html'});
  		res.end('<p>awesomeCount:</p> ' + responses[0] + '<p>gnarlyCount:</p>' + responses[1] + '<p>radCount:</p>' + responses[2] +
  			'<p>groovyCount:</p>' + responses[3]);


  });

// Routes
app.get('/', function(req, res) {
    res.render('index.ejs', { terms: terms });
});
app.get('/awesome', routes.awesome); 
app.get('/cool', routes.cool);
app.get('/rad', routes.rad);
app.get('/gnarly', routes.gnarly);
app.get('/groovy', routes.groovy);
//app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

/*var sockets = io.listen(app);

sockets.on('connection', function (socket) {
    listener.subscribe('update')
    listener.on('message', function(channel, msg) {
  console.log(msg);
  var message = JSON.parse(msg);
  socket.emit('update', { key:message.key, count: message.count });
    });
});
*/
