import { AppDataSource } from '~/config/data-source'
import { Book } from '../entity/Book.entity'

class BookService {
  private bookRepository = AppDataSource.getRepository(Book)
  async countBooks() {
    return this.bookRepository.count()
  }
  async getBookList() {
    return this.bookRepository.find({ order: { title: 'ASC' }, relations: ['author'] })
  }
  async getBookById(id: number) {
    return this.bookRepository.findOne({ relations: ['author', 'genres', 'bookInstances'], where: { id: id } })
  }
}
const bookService = new BookService()
export default bookService
