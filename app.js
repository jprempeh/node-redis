var express = require('express');
var app     = express();

app.get('*', function(req,res) {
	res.send('express is responding');
});

app.listen(3000);
console.log('App running on port 3000');