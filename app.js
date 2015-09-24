var express = require('express');
var app     = express();
var errorHandlers = require('./middleware/errorhandlers');
var routes = require('./routes');


app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);

app.use(errorHandlers.notFound);

app.listen(3000);
console.log('App running on port 3000');