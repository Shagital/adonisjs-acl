import fs from 'fs'
import path from 'path'

export default async function instructions(
  projectRoot: string,
) {
  const packageBasePath = path.resolve(`${__dirname}/src`)
  // 1. Copy config
  fs.copyFileSync(`${packageBasePath}/config/rolePermission.txt`, `${projectRoot}/config/rolePermission.ts`)

  // 2. Copy middlewares
  const middlewarePath = `${projectRoot}/app/Middleware`
  if(!fs.existsSync(middlewarePath)) {
    fs.mkdirSync(middlewarePath, { recursive: true });
  }
  fs.copyFileSync(`${packageBasePath}/middlewares/Can.txt`, `${middlewarePath}/Can.ts`)
  fs.copyFileSync(`${packageBasePath}/middlewares/Is.txt`, `${middlewarePath}/Is.ts`)

  // 3. Copy models
  const modelPath = `${projectRoot}/app/Models`
  if(!fs.existsSync(modelPath)) {
    fs.mkdirSync(modelPath, { recursive: true });
  }
  fs.copyFileSync(`${packageBasePath}/models/Permission.txt`, `${modelPath}/Permission.ts`)
  fs.copyFileSync(`${packageBasePath}/models/Role.txt`, `${modelPath}/Role.ts`)
  fs.copyFileSync(`${packageBasePath}/models/RolePermission.txt`, `${modelPath}/RolePermission.ts`)
  fs.copyFileSync(`${packageBasePath}/models/UserPermission.txt`, `${modelPath}/UserPermission.ts`)
  fs.copyFileSync(`${packageBasePath}/models/UserRole.txt`, `${modelPath}/UserRole.ts`)

  // 4. Copy migrations
  const migrationPath = `${projectRoot}/database/migrations`
  if(!fs.existsSync(migrationPath)) {
    fs.mkdirSync(migrationPath, { recursive: true });
  }
  fs.copyFileSync(`${packageBasePath}/migrations/acl_1_roles.txt`, `${migrationPath}/acl_1_roles.ts`)
  fs.copyFileSync(`${packageBasePath}/migrations/acl_2_permissions.txt`, `${migrationPath}/acl_2_permissions.ts`)
  fs.copyFileSync(`${packageBasePath}/migrations/acl_3_role_permissions.txt`, `${migrationPath}/acl_3_role_permissions.ts`)
  fs.copyFileSync(`${packageBasePath}/migrations/acl_4_user_permissions.txt`, `${migrationPath}/acl_4_user_permissions.ts`)
  fs.copyFileSync(`${packageBasePath}/migrations/acl_5_user_roles.txt`, `${migrationPath}/acl_5_user_roles.ts`)
}
