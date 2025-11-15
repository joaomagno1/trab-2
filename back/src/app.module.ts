import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { DisciplineModule } from './discipline/discipline.module';
import { ModulesModule } from './modules/modules.module';
import { SubmoduleModule } from './submodule/submodule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Usando Joi pra validar o .env
      // Se faltar alguma variável aqui, a aplicação nem sobe.
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        ORACLE_LIB_DIR: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(1521),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_AUTOLOADENTITIES: Joi.boolean().default(true),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
        DB_LOGGING: Joi.boolean().default(true),
      }),
    }),
    // Configuração assíncrona do TypeORM pra poder injetar o ConfigService
    // e ler as variáveis do .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'oracle',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        sid: config.get('DB_DATABASE'),
        password: config.get('DB_PASSWORD'),
        autoLoadEntities: config.get('DB_AUTOLOADENTITIES'),
        synchronize: config.get('DB_SYNCHRONIZE'),
        logging: config.get('DB_LOGGING'),
      }),
    }),
    // Módulos da nossa aplicação
    DisciplineModule,
    ModulesModule,
    SubmoduleModule,
  ],
})
export class AppModule {}