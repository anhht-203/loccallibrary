import { AppDataSource } from '../config/data-source'
import { Author } from '../entity/Author.entity'

class AuthorService {
  private authorRepository = AppDataSource.getRepository(Author)
  async countAuthors() {
    return this.authorRepository.count()
  }
  async getAuthorList() {
    return this.authorRepository.find({ order: { firstName: 'ASC' } })
  }
  async getAuthorById(id: number) {
    return this.authorRepository.findOne({ relations: ['books'], where: { id: id } })
  }
  async deleteAuthor(id: number) {
    return this.authorRepository.delete(id)
  }
  async createAuthor(author: Author) {
    return this.authorRepository.save(author)
  }
}
const authorService = new AuthorService()
export default authorService
