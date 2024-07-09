import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './Book.entity'
import { DATATYPE_MYSQL, ENTITY_PROPERTY_LENGTH } from '~/constants/typedb.constant'

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: DATATYPE_MYSQL.STRING, length: ENTITY_PROPERTY_LENGTH.NUM_100 })
  name!: string

  @ManyToMany(() => Book, (book) => book.genres)
  books!: Book[]
}
