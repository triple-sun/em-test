export enum Service {
  API = 'API',
  Prisma = 'Prisma',
  Users = 'Users',
  UpdateLog = 'UpdateLog',
}

export enum Entity {
  User = 'User',
  UserUpdate = 'UserUpdate',
}

export enum PortDefault {
  Postgres = 5432,
  Users = 3000,
  UpdateLog = 3001
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum Path {
  Users = 'users',
  Spec = 'spec',
  Updates = 'updates',
}
