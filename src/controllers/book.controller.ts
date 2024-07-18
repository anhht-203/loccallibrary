import e, { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import bookService from '../services/book.service'
import authorService from '../services/author.service'
import bookInstanceService from '../services/bookInstance.service'
import genreService from '../services/genre.service'
import { Book } from '~/entity/Book.entity'

const getBookOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', 'Invalid book id parameter')
    res.redirect('/books')
    return null
  }

  const book = await bookService.getBookById(id)
  if (book === null) {
    req.flash('error', 'Book not found')
    res.redirect('/books')
    return null
  }

  return book
}
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
  const books = await bookService.getBookList()
  res.render('books/index', { books, title: 'book.title.listOfBook' })
})
export const getBookDetail = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const book = await getBookOrThrow(req, res, next)
  if (!book) return
  res.render('books/show', {
    book,
    bookInstances: book?.bookInstances,
    bookGenres: book?.genres,
    bookInstanceStatuses: book?.bookInstances
  })
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
