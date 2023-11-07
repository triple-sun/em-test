import { IntersectionType } from "@nestjs/swagger";
import { APIEnvConfig, PrismaEnvConfig, RMQEnvConfig } from "../env.config";
import { validateEnv } from "../../utils/common.util";
import { ConfigModuleOptions, registerAs } from "@nestjs/config";
import envSchemaConfig from "./env-schema.config";

export const appConfig = {
  cache: true,
  isGlobal: true,
  expandVariables: true,
};

export const prismaOptions = registerAs('prisma', () => ({
  port: process.env['PRISMA_PORT'],
  host: process.env['PRISMA_HOST'],
  user: process.env['PRISMA_USER'],
  pass: process.env['PRISMA_PASS'],
  DB: process.env['PRISMA_DB'],
}));

class EnvConfig extends IntersectionType(
  IntersectionType(APIEnvConfig, PrismaEnvConfig),
  RMQEnvConfig
) {}

export const appConfigModuleOptions: ConfigModuleOptions = {
  ...appConfig,
  envFilePath: '/em-test',
  load: [prismaOptions],
  validate: validateEnv(EnvConfig),
  validationSchema: envSchemaConfig
}
