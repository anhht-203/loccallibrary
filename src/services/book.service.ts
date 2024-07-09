import { AppDataSource } from '~/config/data-source'
import { Book } from '../entity/Book.entity'

class BookService {
  private bookRepository = AppDataSource.getRepository(Book)
  async countBooks() {
    return this.bookRepository.count()
  }
}
const bookService = new BookService()
export default bookService
