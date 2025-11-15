import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as oracledb from 'oracledb';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente primeiro
dotenv.config();

    //Isso aqui é a parte mais importante pra fazer o Oracle funcionar
// Tivemos que baixar o "Instant Client" da Oracle e apontar a libDir pra ele.
// Se não fizer isso, o TypeORM não acha o driver.
const oracleLibDir = process.env.ORACLE_LIB_DIR;
if (oracleLibDir) {
  try {
    oracledb.initOracleClient({ libDir: oracleLibDir });
  } catch (error) {
    console.error('Erro ao inicializar o cliente Oracle:', error);
    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Liberando o CORS pro React (que roda na porta 3000) poder acessar
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Usa a porta do .env ou 3000 como padrão
  await app.listen(process.env.PORT || 3000);
}

bootstrap();