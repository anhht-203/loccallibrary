import { AppDataSource } from '../config/data-source'
import { Author } from '../entity/Author.entity'

class AuthorService {
  private authorRepository = AppDataSource.getRepository(Author)
  async countAuthors() {
    return this.authorRepository.count()
  }
}
const authorService = new AuthorService()
export default authorService
