import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import bookInstanceService from '../services/bookInstance.service'
import { BOOK_INSTANCE_STATUS } from '~/constants/typedb.constant'

const getBookInstanceOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', 'Invalid book instance id parameter')
    res.redirect('/bookInstances')
    return null
  }

  const bookInstance = await bookInstanceService.getBookInstanceById(id)
  if (bookInstance === null) {
    req.flash('error', 'Book instance not found')
    res.redirect('/bookInstances')
    return null
  }

  return bookInstance
}
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
  res.send('NOT IMPLEMENTED: BookInstance create GET')
})
export const createBookInstancePost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST')
})
export const deleteBookInstanceGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: BookInstance delete GET ${req.params.id}`)
})
export const updateBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: BookInstance update GET ${req.params.id}`)
})
