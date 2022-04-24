import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from '@ioc:Adonis/Core/Config'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

const roleTable = Config.get('rolePermission.role_table', 'roles')
const userRoleTable = Config.get('rolePermission.user_role_table', 'user_roles')

/**
 * Role authentication to check if user has any of the specified roles
 *
 * Should be called after auth middleware
 */
export default class Is {
  /**
   * Handle request
   */
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roleNames: string[]
  ) {
    /**
     * Check if user is logged-in or not.
     */
    let user = await auth.user
    if (!user) {
      return response.unauthorized({ error: 'Must be logged in' })
    }
    let hasRole = await this.checkHasRoles(auth.user, roleNames)
    if (!hasRole) {
      return response.unauthorized({
        error: `Doesn't have required role(s): ${roleNames.join(',')}`,
      })
    }
    await next()
  }

  private async checkHasRoles(user: User, roleNames: Array<string>): Promise<boolean> {
    let rolePlaceHolder = '('
    let placeholders = new Array(roleNames.length).fill('?')
    rolePlaceHolder += placeholders.join(',')
    rolePlaceHolder += ')'

    let {
      0: {
        0: { roleCount },
      },
    } = await Database.rawQuery(
      'SELECT count(`ur`.`id`) as roleCount FROM ' +
        userRoleTable +
        ' ur INNER JOIN ' +
        roleTable +
        ' r ON ur.role_id=r.id WHERE `ur`.`user_id`=? AND `r`.`name` in ' +
        rolePlaceHolder +
        ' LIMIT 1',
      [user.id, ...roleNames]
    )

    return roleCount > 0
  }
}
