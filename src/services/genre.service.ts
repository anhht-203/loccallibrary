import { AppDataSource } from '../config/data-source'
import { Genre } from '../entity/genre.entity'

class GenreService {
  private genreRepository = AppDataSource.getRepository(Genre)
  async countGenres() {
    return this.genreRepository.count()
  }
  async getGenreList() {
    return this.genreRepository.find({ order: { name: 'ASC' } })
  }
  async getGenreById(id: number) {
    return this.genreRepository.findOne({ where: { id: id }, relations: ['books'] })
  }
}
const genreService = new GenreService()
export default genreService
