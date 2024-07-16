// src/routes/index.ts
import { Router, Request, Response, NextFunction } from 'express'
import authorRouter from './author.router'
import bookRouter from './book.router'
import bookinstanceRouter from './bookinstance.router'
import genreRouter from './genre.router'
import { index } from '~/controllers/book.controller'

// import all route modules for your site at here
const router: Router = Router()
// ...
router.get('/', index)
router.use('/authors', authorRouter)
router.use('/books', bookRouter)
router.use('/bookinstances', bookinstanceRouter)
router.use('/genres', genreRouter)
export default router
