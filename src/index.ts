import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createError from 'http-errors'
import path from 'path'
import indexRouter from './router/index'
import usersRouter from './router/user'
const app = express()
// Set up view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
// import your routes and use them here

app.use('/', indexRouter)
app.use('/users', usersRouter)

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.listen(3000, () => {
  console.log('listening on port 3000')
})
export default app
