import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;
const MS_PREFIX = process.env.MS_PREFIX || 'api';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix(MS_PREFIX);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('ms-to-do-list-challenge')
    .setDescription('Microsserviço da aplicação To-Do List')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [AppModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup(`swagger`, app, document);

  await app.listen(PORT);
}
bootstrap();
