import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './Book.entity'
import { DATATYPE_MYSQL, ENTITY_PROPERTY_LENGTH } from '~/constants/typedb.constant'

@Entity()
export class BookInstance {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_200 })
  imprint!: string

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_200 })
  status!: string

  @Column({ type: DATATYPE_MYSQL.TIMESTAMP })
  dueBack!: Date

  @ManyToOne(() => Book, (book) => book.bookInstances)
  @JoinColumn({ name: 'bookId' })
  book!: Book
}
