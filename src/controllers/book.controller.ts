import e, { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import bookService from '../services/book.service'
import authorService from '../services/author.service'
import bookInstanceService from '../services/bookInstance.service'
import genreService from '../services/genre.service'
export const index = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const [numBooks, numBookInstances, availableBookInstances, numAuthors, numGenres] = await Promise.all([
    bookService.countBooks(),
    bookInstanceService.countBookInstances(),
    bookInstanceService.countAvailableBookInstances(),
    authorService.countAuthors(),
    genreService.countGenres()
  ])
  res.render('index', {
    title: 'Local Library',
    numBooks: numBooks,
    numBookInstances: numBookInstances,
    numAvailableBookInstances: availableBookInstances,
    numAuthors: numAuthors,
    numGenres: numGenres
  })
})
export const getBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book list')
})
export const getBookDetail = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
})
export const createBookGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book create GET')
})
export const createBookPost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Book create POST')
})
export const deleteBookGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Book delete GET ${req.params.id}`)
})
export const updateBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Book update GET ${req.params.id}`)
})
