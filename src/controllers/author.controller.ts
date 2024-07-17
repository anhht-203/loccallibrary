import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import authorService from '../services/author.service'
// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authors = await authorService.getAuthorList()
  res.render('authors/index', { authors, title: 'author.title.listOfAuthor' })
})
// Display detail page for a specific Author.
export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`)
})
export const authorCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Author create GET')
})
export const authorCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Author create POST')
})
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author delete GET ${req.params.id}`)
})
export const authorUpdate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author update GET ${req.params.id}`)
})
