import { AppDataSource } from '../config/data-source'
import { Genre } from '../entity/genre.entity'

class GenreService {
  private genreRepository = AppDataSource.getRepository(Genre)
  async countGenres() {
    return this.genreRepository.count()
  }
}
const genreService = new GenreService()
export default genreService
