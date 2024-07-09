import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Book } from './Book.entity'
import { DATATYPE_MYSQL, ENTITY_PROPERTY_LENGTH } from '~/constants/typedb.constant'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_100 })
  firstName!: string

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_100 })
  familyName!: string

  @Column({ type: DATATYPE_MYSQL.DATE, nullable: true })
  dateOfBirth!: Date

  @Column({ type: DATATYPE_MYSQL.DATE, nullable: true })
  dateOfDeath!: Date

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[]
}
