import e, { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

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
