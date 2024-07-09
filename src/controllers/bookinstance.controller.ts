import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

export const getBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: BookInstance list')
})
export const getBookInstanceDetail = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`)
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
