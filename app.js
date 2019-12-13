var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const users = require("./routes/users");
const trees = require("./routes/trees");
const records = require("./routes/plantingRecords");
const tags = require("./routes/tags");

var cors = require('cors');
// const swal = require('sweetalert2');
var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/addFriend/:id', users.findOne);
app.post('/userCreate', users.createUser);
app.get('/getCoinBalance/:id',users.getCoins);
app.get('/findUser/:usertoken', users.findByUserToken);
app.get('/findAllUsers', users.findAllUsers);

app.get('/getTags', tags.getTags);

//find tag by id!
app.get('/getTag/:id', tags.getTag);

app.delete('/delete/:id',users.deleteUser);
app.put('/buyTree/:id',users.putTree);
//show all the trees in store
app.get('/plantList', trees.findAllPlants);
//show what trees the user own + Actually: get userdetails 等同于findByUserToken
app.get('/myplant/:usertoken', users.getMytrees)
//show tree details
app.get('/getOneTree/:name', trees.findOneTree)



//show all focus time
// app.get('/totalFocusTime/:id',records.totalFocusTime);
// app.get('/plantingRecords/:id', records.findRecordsOfUser);
app.put('/tagEdition/:id', tags.editTag);
app.post('/tagCreation', tags.addTag);
app.delete('/deleteTag/:id', tags.deleteTag);

//NEW
app.post('/addRecord', records.addRecord);
app.get('/records/:usertoken/:id', records.findOne);
app.get('/recordsOfOne/:usertoken', records.findRecOfOne);
app.delete('/records/:id', records.deleteRecord);
app.put('/records/:usertoken/:id', records.updateRecord)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
