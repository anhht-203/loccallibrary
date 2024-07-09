export class DATATYPE_MYSQL {
  static readonly STRING = 'varchar'
  static readonly NUMBER = 'int'
  static readonly DATE = 'date'
  static readonly TIMESTAMP = 'timestamp'
  static readonly BOOLEAN = 'boolean'
  static readonly TEXT = 'text'
  static readonly JSON = 'json'
  static readonly ENUM = 'enum'
}
export class ENTITY_PROPERTY_LENGTH {
  static readonly NUM_100 = 100
  static readonly NUM_200 = 200
  static readonly NUM_500 = 500
  static readonly NUM_1000 = 1000
}
export enum BOOK_INSTANCE_STATUS {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
  MAINTENANCE = 'Maintenance',
  RESERVED = 'Reserved',
  LOANED = 'Loaned'
}
