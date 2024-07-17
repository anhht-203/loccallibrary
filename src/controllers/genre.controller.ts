import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import genreService from '../services/genre.service'

const getGenreOrThrow = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    req.flash('error', 'Invalid genre id parameter')
    res.redirect('/genres')
    return null
  }

  const genre = await genreService.getGenreById(id)
  if (genre === null) {
    req.flash('error', 'Genre not found')
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
  res.send('NOT IMPLEMENTED: Genre create GET')
})
export const createGenrePost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send('NOT IMPLEMENTED: Genre create POST')
})
export const deleteGenreGet = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Genre delete GET ${req.params.id}`)
})
export const updateGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Genre update GET ${req.params.id}`)
})
