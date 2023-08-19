import { DateTime } from 'luxon'
import { uuid } from 'uuidv4'
import {
  BaseModel,
  HasMany,
  beforeCreate,
  beforeSave,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Project from './Project'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @beforeCreate()
  public static assignUuid(user: User) {
    user.uuid = uuid()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column()
  public email: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: 'mobileNumber' })
  public mobileNumber: string

  @hasMany(() => Project)
  public projects: HasMany<typeof Project>
}
