import { Expose } from 'class-transformer';
import { ValidateIf } from 'class-validator';
import { ValidateENVPort, ValidateENVProp } from '../decorators/validate-env.decorator';

export class APIEnvConfig {
  @Expose()
  @ValidateIf(({ obj }) => !{ ...obj }.DATABASE_URL)
  @ValidateENVPort()
  public API_PORT!: number;
}

export class RMQEnvConfig {
  @ValidateENVProp()
  public RMQ_USER!: string;

  @ValidateENVProp()
  public RMQ_PASS!: string;

  @ValidateENVProp()
  public RMQ_HOST!: string;

  @ValidateENVProp()
  public RMQ_UPDATE_QUEUE!: string;

  @ValidateENVProp()
  public RMQ_USERS_QUEUE!: string;
}

export class PrismaEnvConfig {
  @ValidateENVProp()
  public PRISMA_DB!: string;

  @ValidateENVProp()
  public PRISMA_HOST!: string;

  @ValidateENVProp()
  public PRISMA_USER!: string;

  @ValidateENVProp()
  public PRISMA_PASS!: string;

  @ValidateENVProp()
  public DATABASE_URL!: string;
}

export type TEnvConfig =
  | APIEnvConfig
  | PrismaEnvConfig
  | RMQEnvConfig
