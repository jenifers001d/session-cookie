var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//cookie選項的secure要被設成true時才需要下面這行
//而且需要https
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'testSecret',
    resave: false, //建議是true
    saveUninitialized: true,
    //cookie: { secure: true }
    cookie: {
        httpOnly: true,
        maxAge: 10000
    }
}));
/*
secret：會依照你裡面的字串來進行簽署 cookie，所以你從 cookie 看到的 sesssion 就是依照你的 secret字串 來進行加密邏輯的，那是必加欄位。
*/

/*
resave : 是當你每次載入網頁時，都會再重新設置 session cookie，所以如果你的 session 有設定失效時間時，例如 10 分鐘，重新整理後，就會又有 10 分鐘，所以如果你設定 true 的話就會生效。
假設希望當 session 產生資料後，就強制要在 10 分鐘內關閉，就請把它設定成 false。
舉例來說，網路銀行通常都會用 false，當你六百秒沒動作時，就會取消 session，但假使你重新整理的話，就又再次重置 600 秒
*/

/*
saveUninitialized：無論有没有 session cookie，每次請求都設置 session cookie，默認標示為 connect.sid。
如果沒有登入 (session object isn't modified)，false時，不會存 session object 到 session store。true時，會存 session object 到 session store，默認為 connect.sid。
如果有登入 (session object is modified)，不管 false/true 都會存 session object 到 session store。
*/


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
