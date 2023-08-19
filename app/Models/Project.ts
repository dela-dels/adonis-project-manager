import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { v4 as uuid } from 'uuid'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @beforeCreate()
  public static assignUuid(project: Project) {
    project.uuid = uuid()
  }

  @column()
  public name: string

  @column.dateTime({
    serializeAs: 'startDate',
    serialize: (value: DateTime | null) => {
      return value ? value.toISO() : value
    },
  })
  public startDate: DateTime

  @column.dateTime({
    serializeAs: 'endDate',
    serialize: (value: DateTime | null) => {
      return value ? value.toISO() : value
    },
  })
  public endDate: DateTime

  @column({ serializeAs: null })
  public createdBy: number

  @column()
  public code: string

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({
    autoCreate: true,
    serializeAs: 'createdOn',
    serialize: (value: DateTime | null) => {
      return value ? value.toISO() : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
