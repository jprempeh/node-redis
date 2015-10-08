var express = require('express'),
	app = express(),
	redis = require('redis'),
	client = redis.createClient(),
	bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
	client.incr("test", function(err, counter) {
		res.render('index', { redis: counter});
	});
});

app.post('/', function (req, res) {
	console.log(req.body);
	res.redirect('/');
});

function CreateUser(username, name, cb) {
	client.incr('next:user:id', function(err, userid) {
		flow.exec(
			function() {
				var user_string = 'user:' + userid;
				client.set('user:' + username, userid, this.MULTI());
				client.hset(user_string, 'name', name, this.MULTI());
				client.hset(user_string, 'username', username, this.MULTI());
			}, function(args) {
				cb(userid);
			}
		);
	});
}
app.listen(8003);