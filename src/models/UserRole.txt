import {column, BaseModel, belongsTo, BelongsTo, SnakeCaseNamingStrategy} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Role from 'App/Models/Role'
import { DateTime } from 'luxon'
import moment from 'moment'

export default class UserRole extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()
  public static primaryKey = 'id'
  public static table = 'user_roles'
  public static selfAssignPrimaryKey = false

  @column({
    isPrimary: true,
  })
  public id: number

  @column({})
  public user_id: number

  @column({})
  public role_id: number

  @column({
    serialize: (value: DateTime | null) => {
      return value ? moment(value).format('lll') : value
    },
  })
  public created_at: DateTime

  @column({
    serialize: (value: DateTime | null) => {
      return value ? moment(value).format('lll') : value
    },
  })
  public updated_at: DateTime

  public static boot() {
    super.boot()

    this.before('create', async (_modelInstance) => {
      _modelInstance.created_at = this.formatDateTime(_modelInstance.created_at)
      _modelInstance.updated_at = this.formatDateTime(_modelInstance.updated_at)
    })
    this.before('update', async (_modelInstance) => {
      _modelInstance.created_at = this.formatDateTime(_modelInstance.created_at)
      _modelInstance.updated_at = this.formatDateTime(_modelInstance.updated_at)
    })
  }

  private static formatDateTime(datetime) {
    let value = new Date(datetime)
    return datetime
      ? value.getFullYear() +
          '-' +
          (value.getMonth() + 1) +
          '-' +
          value.getDate() +
          ' ' +
          value.getHours() +
          ':' +
          value.getMinutes() +
          ':' +
          value.getSeconds()
      : datetime
  }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>
}
