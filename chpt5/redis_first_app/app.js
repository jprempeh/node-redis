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

function GetUserID(username, name, cb) {
	client.get('user:' + username, function (err, userid) {
		if(userid) {
			cb(userid);
		} else {
			CreateUser(username, name, function(new_user) {
				cb(new_user);
			});
		}
	});
}

// Storing Message
function AddMessage(message, userid, cb) {
	client.incr('next:message:id', function(err, id){
		flow.exec(
			function() {
				var mess_id = 'message:' + id;
				client.set(mess_id, message, this.MULTI());
				client.set(mess_id + ':user', userid, this.MULTI());
				client.lpush('messages', id, this.MULTI());
			}, function() {
				cb(id);
			}
		);
	});
}

// Fetching Messages
function FetchMessage(id, cb) {
	client.get('message:' + id, function(err, message) {
		client.get('message:')
	})
}

app.listen(8003);