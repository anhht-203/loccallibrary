import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import bookInstanceService from '../services/bookInstance.service'
import { BOOK_INSTANCE_STATUS } from '~/constants/typedb.constant'
import bookService from '../services/book.service'
import { body, validationResult } from 'express-validator'
import { translate } from '~/utils/translateI18n'

const getBookInstanceOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', req.t('message.invalidBookInstanceId'))
    res.redirect('/bookInstances')
    return null
  }

  const bookInstance = await bookInstanceService.getBookInstanceById(id)
  if (bookInstance === null) {
    req.flash('error', req.t('message.notFound'))
    res.redirect('/bookInstances')
    return null
  }

  return bookInstance
}
const bookInstanceValidationRules = () => [
  body('book', translate('validation.book')).trim().isLength({ min: 1 }).escape(),
  body('imprint', translate('validation.imprint')).trim().isLength({ min: 1 }).escape(),
  body('status', translate('validation.status')).trim().isLength({ min: 1 }).escape(),
  body('dueBack', translate('validation.dueBack')).optional({ checkFalsy: false }).isISO8601().toDate()
]
export const getBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bookInstances = await bookInstanceService.getBookInstanceList()
  res.render('bookInstance/index', {
    bookInstances,
    title: 'bookInstance.title.listOfBookInstance',
    BOOK_INSTANCE_STATUS
  })
})
export const getBookInstanceDetail = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bookInstance = await getBookInstanceOrThrow(req, res, next)
  if (!bookInstance) return
  res.render('bookInstance/show', { bookInstance, bookInstanceBooks: bookInstance?.book, BOOK_INSTANCE_STATUS })
})
export const createBookInstanceGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const books = await bookService.getBookList()
  res.render('bookInstance/create', { title: 'bookInstance.createBookInstance', books })
})
export const createBookInstancePost = [
  ...bookInstanceValidationRules(),
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const books = await bookService.getBookList()
      res.render('bookInstance/create', {
        title: 'bookInstance.createBookInstance',
        books,
        bookInstance: req.body,
        errors: errors.array().map((error) => ({
          ...error,
          msg: req.t(error.msg)
        }))
      })
      return
    } else {
      const bookInstance = await bookInstanceService.createBookInstance(req.body)
      req.flash('success', req.t('message.createSuccess'))
      res.redirect(`/bookInstances/${bookInstance.id}`)
    }
  })
]
export const deleteBookInstanceGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bookInstance = await getBookInstanceOrThrow(req, res, next)
  if (!bookInstance) return
  res.render('bookInstance/delete', { title: 'bookInstance.deleteBookInstance', bookInstance })
})
export const deleteBookInstancePost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const bookInstance = await getBookInstanceOrThrow(req, res, next)
  if (!bookInstance) return
  await bookInstanceService.deleteBookInstance(bookInstance.id)
  req.flash('success', req.t('message.deleteSuccess'))
  res.redirect('/bookInstances')
})
export const updateBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: BookInstance update GET ${req.params.id}`)
})
