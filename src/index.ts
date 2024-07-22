import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import { AppDataSource } from './config/data-source'
import router from './router/index'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const secret = process.env.SESSION_SECRET || 'secret'

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'vi',
    preload: ['en', 'vi'],
    supportedLngs: ['en', 'vi'],
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
      lookupQuerystring: 'lang', // ?lng=en or ?lng=vi để chuyển ngôn ngữ trên url
      lookupCookie: 'lang', // chuyển ngôn ngữ bằng cách set cookie
      ignoreCase: true,
      cookieSecure: false
    }
  })

app.use(middleware.handle(i18next))

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: secret
  })
)

app.use(flash())

app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})
app.listen(3000, () => {
  console.log('listening on port 3000')
})
AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized')
  })
  .catch((error) => console.log('Database connect failed: ', error))
export default app
