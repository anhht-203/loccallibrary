import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import genreService from '../services/genre.service'
import { body, Result, validationResult } from 'express-validator'
import { Genre } from '~/entity/genre.entity'
import { translate } from '~/utils/translateI18n'

const getGenreOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', req.t('message.invalidGenreId'))
    res.redirect('/genres')
    return null
  }

  const genre = await genreService.getGenreById(id)
  if (genre === null) {
    req.flash('error', req.t('message.notFound'))
    res.redirect('/genres')
    return null
  }

  return genre
}
export const getGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const genres = await genreService.getGenreList()
  res.render('genres/index', { genres, title: 'genre.title.listOfGenre' })
})
export const getGenreDetail = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const genre = await getGenreOrThrow(req, res, next)
  if (!genre) return
  res.render('genres/show', { genre, genreBooks: genre?.books })
})
export const createGenreGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render('genres/form', { title: 'genre.createGenre' })
})
export const createGenrePost = [
  body('name').trim().isLength({ min: 1 }).withMessage(translate('validation.nameGenre')).escape(),
  expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const genre = new Genre()
    genre.name = req.body.name

    if (!errors.isEmpty()) {
      res.render('genres/form', {
        title: 'genre.createGenre',
        genre: genre,
        errors: errors.array()
      })
      return
    } else {
      const genreExists = await genreService.getGenreByName(genre.name)
      if (genreExists) {
        res.redirect(`/genres/${genreExists.id}`)
      } else {
        await genreService.createGenre(genre)
        res.redirect(`/genres/${genre.id}`)
      }
    }
  })
]
export const deleteGenreGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const genre = await getGenreOrThrow(req, res, next)
  if (!genre) return
  const genreBooks = genre?.books
  res.render('genres/delete', { genre, title: 'genre.deleteGenre', genreBooks })
})
export const deleteGenrePost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const genre = await getGenreOrThrow(req, res, next)
  if (!genre) return
  const genreBooks = genre?.books
  if (genreBooks.length > 0) {
    res.render('genres/delete', { genre, title: 'genre.deleteGenre', genreBooks })
    return
  } else {
    await genreService.deleteGenre(genre.id)
    req.flash('success', req.t('message.deleteSuccess'))
    res.redirect('/genres')
  }
})
export const updateGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Genre update GET ${req.params.id}`)
})
