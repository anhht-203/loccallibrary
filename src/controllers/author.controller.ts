import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import authorService from '../services/author.service'
import { body, validationResult } from 'express-validator'
import { translate } from '~/utils/translateI18n'

const getAuthorOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', req.t('message.invalidAuthorId'))
    res.redirect('/authors')
    return null
  }

  const author = await authorService.getAuthorById(id)
  if (author === null) {
    req.flash('error', req.t('message.notFound'))
    res.redirect('/authors')
    return null
  }

  return author
}
const authorValidationRules = () => [
  body('firstName').trim().isLength({ min: 1 }).withMessage(translate('validation.firstName')).escape(),
  body('familyName').trim().isLength({ min: 1 }).withMessage(translate('validation.familyName')).escape(),
  body('dateOfBirth')
    .optional({ checkFalsy: false })
    .isISO8601()
    .withMessage(translate('validation.dateOfBirth'))
    .toDate(),
  body('dateOfDeath')
    .optional({ checkFalsy: false })
    .isISO8601()
    .withMessage(translate('validation.dateOfDeath'))
    .toDate()
]
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
  res.render('authors/create', { title: 'author.createAuthor' })
})
export const authorCreatePost = [
  ...authorValidationRules(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('authors/create', {
        title: 'author.createAuthor',
        author: req.body,
        errors: errors.array().map((error) => ({
          ...error,
          msg: req.t(error.msg)
        }))
      })
      return
    } else {
      const author = await authorService.createAuthor(req.body)
      req.flash('success', req.t('message.createSuccess'))
      res.redirect(`/authors/${author.id}`)
    }
  })
]
export const authorDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const author = await getAuthorOrThrow(req, res, next)
  if (!author) return
  const allBooksByAuthor = author?.books
  res.render('authors/delete', { title: 'author.deleteAuthor', author: author, authorBooks: allBooksByAuthor })
})
export const authorDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const author = await getAuthorOrThrow(req, res, next)
  if (!author) return
  const allBooksByAuthor = author?.books
  if (allBooksByAuthor.length > 0) {
    // Author has books. Render in same way as for GET route.
    res.render('author/delete', {
      title: 'author.deleteAuthor',
      author: author,
      authorBooks: allBooksByAuthor
    })
    return
  } else {
    await authorService.deleteAuthor(author.id)
    req.flash('success', req.t('message.deleteSuccess'))
    res.redirect('/authors')
  }
})
export const authorUpdate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Author update GET ${req.params.id}`)
})
