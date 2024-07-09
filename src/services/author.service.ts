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
}
const authorService = new AuthorService()
export default authorService
