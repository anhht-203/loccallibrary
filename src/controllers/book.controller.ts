import e, { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import bookService from '../services/book.service'
import authorService from '../services/author.service'
import bookInstanceService from '../services/bookInstance.service'
import genreService from '../services/genre.service'
import { Book } from '~/entity/Book.entity'
import { body, validationResult } from 'express-validator'
import { BOOK_INSTANCE_STATUS } from '~/constants/typedb.constant'
import { translate } from '~/utils/translateI18n'

const getBookOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', req.t('message.invalidBookId'))
    res.redirect('/books')
    return null
  }

  const book = await bookService.getBookById(id)
  if (book === null) {
    req.flash('error', req.t('message.notFound'))
    res.redirect('/books')
    return null
  }

  return book
}
const bookValidationRules = () => [
  body('title').trim().notEmpty().withMessage(translate('validation.title')).escape(),
  body('author').trim().notEmpty().withMessage(translate('validation.author')).escape(),
  body('summary').trim().notEmpty().withMessage(translate('validation.summary')).escape(),
  body('isbn').trim().notEmpty().withMessage(translate('validation.isbn')).escape(),
  body('genre.*').escape()
]
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
    bookInstanceStatuses: book?.bookInstances,
    BOOK_INSTANCE_STATUS
  })
})
export const createBookGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const [allAuthors, allGenres] = await Promise.all([authorService.getAuthorList(), genreService.getGenreList()])
  res.render('books/create', { title: 'book.createBook', authors: allAuthors, genres: allGenres })
})
export const createBookPost = [
  ...bookValidationRules(),
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre]
    }
    const errors = validationResult(req)

    let authors = null
    if (req.body.author) {
      const authorId = parseInt(req.body.author)
      if (!isNaN(authorId)) {
        authors = await authorService.getAuthorById(authorId)
      }
    }

    const genres = await genreService.getGenreByIds(req.body.genre)
    const book = new Book()
    book.title = req.body.title
    if (authors) {
      book.author = authors
    }
    book.summary = req.body.summary
    book.isbn = req.body.isbn
    if (genres) {
      book.genres = genres
    }

    if (!errors.isEmpty() || !authors) {
      const allAuthors = await authorService.getAuthorList()
      const allGenres = await genreService.getGenreList()
      res.render('books/create', {
        title: 'book.createBook',
        authors: allAuthors,
        genres: allGenres,
        book: book,
        errors: errors.array().map((error) => ({
          ...error,
          msg: req.t(error.msg)
        }))
      })
      return
    } else {
      await bookService.createBook(book)
      req.flash('success', req.t('message.createSuccess'))
      res.redirect(`/books/${book.id}`)
    }
  })
]
export const deleteBookGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const book = await getBookOrThrow(req, res, next)
  if (!book) return
  const allBookInstances = book?.bookInstances
  res.render('books/delete', {
    title: 'book.deleteBook',
    book: book,
    bookInstances: allBookInstances,
    BOOK_INSTANCE_STATUS
  })
})
export const deleteBookPost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const book = await getBookOrThrow(req, res, next)
  if (!book) return
  const allBookInstances = book?.bookInstances
  if (allBookInstances.length > 0) {
    res.render('books/delete', {
      title: '',
      book: book,
      bookInstances: allBookInstances
    })
    return
  } else {
    await bookService.deleteBook(book.id)
    req.flash('success', req.t('message.deleteSuccess'))
    res.redirect('/books')
  }
})
export const updateBookGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const book = await getBookOrThrow(req, res, next)
  if (!book) return
  const [allAuthors, allGenres] = await Promise.all([authorService.getAuthorList(), genreService.getGenreList()])
  res.render('books/form', {
    title: 'book.updateBook',
    authors: allAuthors,
    genres: allGenres,
    book: book,
    bookGenres: book.genres
  })
})
export const bookUpdatePost = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre]
      next()
    }
  },
  ...bookValidationRules(),
  expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const authors = await authorService.getAuthorById(parseInt(req.body.author))
    const genres = await genreService.getGenreByIds(req.body.genre)
    const book = new Book()
    book.id = parseInt(req.params.id)
    book.title = req.body.title
    if (authors) {
      book.author = authors
    }
    book.summary = req.body.summary
    book.isbn = req.body.isbn
    if (genres) {
      book.genres = genres
    }
    if (!errors.isEmpty()) {
      res.render('books/form', {
        title: 'book.updateBook',
        authors: authors,
        genres: genres,
        book: book,
        errors: errors.array().map((error) => ({
          ...error,
          msg: req.t(error.msg)
        }))
      })
      return
    } else {
      await bookService.updateBook(book)
      req.flash('success', req.t('message.updateSuccess'))
      res.redirect(`/books/${book.id}`)
    }
  })
]
