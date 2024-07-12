import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Author } from './Author.entity'
import { BookInstance } from './bookinstance.entity'
import { Genre } from './genre.entity'
import { DATATYPE_MYSQL, ENTITY_PROPERTY_LENGTH } from '~/constants/typedb.constant'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_200 })
  title!: string

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_1000, nullable: true })
  summary!: string

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_100, nullable: true })
  isbn!: string

  @Column()
  authorId!: number

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author!: Author

  @ManyToMany(() => Genre)
  @JoinTable()
  genres!: Genre[]

  @OneToMany(() => BookInstance, (bookInstance) => bookInstance.book)
  bookInstances!: BookInstance[]
}
