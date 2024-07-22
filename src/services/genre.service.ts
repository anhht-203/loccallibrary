import { In } from 'typeorm'
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
  async getGenreByIds(ids: number[]) {
    return this.genreRepository.findBy({ id: In(ids) })
  }
  async getGenreByName(name: string): Promise<Genre | null> {
    return this.genreRepository.findOne({ where: { name: name } })
  }
  async createGenre(genre: Genre) {
    return this.genreRepository.save(genre)
  }
  async deleteGenre(id: number) {
    return this.genreRepository.delete(id)
  }
}
const genreService = new GenreService()
export default genreService
