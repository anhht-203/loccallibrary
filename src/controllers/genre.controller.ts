import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import genreService from '../services/genre.service'

export const getGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const genres = await genreService.getGenreList()
  res.render('genres/index', { genres, title: 'genre.title.listOfGenre' })
})
export const getGenreDetail = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`)
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
