import { DateTime } from 'luxon'
import { uuid } from 'uuidv4'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @beforeCreate()
  public static assignUuid(user: User) {
    user.uuid = uuid()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public password: string

  @column()
  public mobileNumber: string
}
