import {column, BaseModel, hasMany, HasMany, SnakeCaseNamingStrategy} from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import moment from 'moment'
import Permission from 'App/Models/Permission'

export default class Role extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()
  public static primaryKey = 'id'
  public static table = 'roles'
  public static selfAssignPrimaryKey = false

  @column({
    isPrimary: true,
  })
  public id: number

  @column({})
  public slug: string

  @column({})
  public name: string

  @column({})
  public description: string

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

  @hasMany(() => Permission)
  public permissions: HasMany<typeof Permission>
}
