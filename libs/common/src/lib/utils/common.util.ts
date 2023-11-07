import { ValidationArguments, validateSync } from 'class-validator';
import { PortDefault, Service } from '../enums/utils.enum';
import { DocumentBuilder } from '@nestjs/swagger';
import { APIEnvConfig } from '../config/env.config';
import { plainToClass, ClassConstructor } from 'class-transformer';

export const validateEnv =
  <T extends typeof APIEnvConfig>(envConfig: T) =>
  (config: Record<string, unknown>) => {
    const cfg = plainToClass(envConfig, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(cfg, { skipMissingProperties: false });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return cfg;
  };

export const fillObject = <T, V>(dto: ClassConstructor<T>, obj: V) =>
  plainToClass(dto, obj, { excludeExtraneousValues: true });

export const getENVErrorMessage = ({
  value,
  targetName,
  property,
}: ValidationArguments) =>
  `${targetName} ${property
    .toLowerCase()
    .replace(/_/g, ' ')} is required. Current value: ${value}`;


const getSwaggerConfig = (title: string, desc: string, version: string) =>
  new DocumentBuilder()
    .setTitle(title)
    .setDescription(desc)
    .setVersion(version)
    .build();

const getAPIConfig = (name: Service) => {
  const desc = `${name} service API`;
  return {
    Name: name,
    Desc: desc,
    Port: process.env['API_PORT'] ?? name === PortDefault.UpdateLog.toString() ? PortDefault.UpdateLog : PortDefault.Users,
    Config: getSwaggerConfig(name, desc, '1.0'),
  };
};

export const UsersAPI = getAPIConfig(Service.Users);

export const UpdateLogAPI = getAPIConfig(Service.UpdateLog)
