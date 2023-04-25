var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { generateQRCode } = require('./qrcode');
const schedule = require('node-schedule');

var indexRouter = require('./routes/index');
var { sendDataToAda, getCurrentTime } = require('./adafruitClient');
var { admin } = require('./firebaseApp');

const currentTime = getCurrentTime();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

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

const controlFeeds = ['control-led', 'control-fan', 'control-relay'];
const db = admin.firestore();

controlFeeds.forEach(feed => {
  const colRef = db.collection(feed);
  const query = colRef.where('timestamp', '>=', currentTime);

  query.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        const log = change.doc.data();
        var value;
        if (log.status === 'on') value = log.level; else value = 0;
        if (feed === 'control-fan') value = 25*value;
        else {
          if (log.status === 'on') value = 1;
          else value = 0;
        }
        console.log(log.status, feed);
        sendDataToAda({
          feedkey: `iot-control.${feed}`,
          value,
        });
      }
    });
  });
});

generateQRCode();

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = 'Asia/Ho_Chi_Minh';

schedule.scheduleJob(rule, generateQRCode);

module.exports = app;
