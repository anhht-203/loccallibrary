import { AppDataSource } from '../config/data-source'
import { BOOK_INSTANCE_STATUS } from '../constants/typedb.constant'
import { BookInstance } from '../entity/bookinstance.entity'

class BookInstanceService {
  private bookInstanceRepository = AppDataSource.getRepository(BookInstance)
  async countBookInstances() {
    return this.bookInstanceRepository.count()
  }
  async countAvailableBookInstances() {
    return this.bookInstanceRepository.count({ where: { status: BOOK_INSTANCE_STATUS.AVAILABLE } })
  }
  async getBookInstanceList() {
    return this.bookInstanceRepository.find({ relations: ['book'] })
  }
}
const bookInstanceService = new BookInstanceService()
export default bookInstanceService
