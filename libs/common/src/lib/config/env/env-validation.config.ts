import { IntersectionType } from '@nestjs/swagger';
import { APIEnvConfig, PrismaEnvConfig, RMQEnvConfig } from '../env.config';
import { validateEnv } from '../../utils/common.util';

class EnvConfig extends IntersectionType(APIEnvConfig, IntersectionType(PrismaEnvConfig, RMQEnvConfig)) {}

export default validateEnv(EnvConfig);
