import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
// import { uuid } from 'uuidv4'
import User from './User'
import { v4 as uuid_v4 } from 'uuid'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @beforeCreate()
  public static assignUuid(project: Project) {
    project.uuid = uuid_v4()
  }

  @column()
  public name: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public createdBy: number

  @column()
  public code: string

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  public project: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
