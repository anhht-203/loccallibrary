import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import authorService from '../services/author.service'

const getAuthorOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', 'Invalid author id parameter')
    res.redirect('/authors')
    return null
  }

  const author = await authorService.getAuthorById(id)
  if (author === null) {
    req.flash('error', 'Author not found')
    res.redirect('/authors')
    return null
  }

  return author
}
// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authors = await authorService.getAuthorList()
  res.render('authors/index', { authors, title: 'author.title.listOfAuthor' })
})
// Display detail page for a specific Author.
export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const author = await getAuthorOrThrow(req, res, next)
  if (!author) return
  res.render('authors/show', { author, authorBooks: author?.books })
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
