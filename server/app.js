import createError from 'http-errors';
import express, { json, urlencoded } from 'express';




const app = express();

// view engine setup
// app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

import indexRouter from './routes/index.js';
 
import cookieParser from 'cookie-parser';
app.use('/', indexRouter);
 

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next)
// {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

export default app;
