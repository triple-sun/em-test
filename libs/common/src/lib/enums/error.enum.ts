export enum ErrorMessage {
  Fetch = "Can't fetch data from",
  Env = "Can't read .env file. Perhaps the file does not exist.",
  File = "Can't read the file:",
  Email = 'Please enter valid email',
  ID = 'Must be a valid ID',
  Salt = 'Missing password salt',
  Exists = 'already exists.',
  NotFound = 'not found.',
  NotImplemented = 'Not implemented',
  UserEmail = 'User with email',
  Forbidden = 'You are not authorized or do not have permission to this page',
  ObjectID = 'is an invalid ObjectID',
  Unauthorized = 'Unauthorized',
  Validation = 'Validation error:',
}

export enum ErrorType {
  NotFound = 'NotFound',
  Exists = 'Exists',
  Invalid = 'Invalid',
  Permission = 'Permission',
  Email = 'Email',
  Length = 'Length',
  ENV = 'ENV',
  Common = 'Common',
}

export enum ENVError {
  APIPort = 'API port is required',
  PrismaDBUrl = 'Database url is required',
  PortInvalid = 'Port value is invalid',
}
