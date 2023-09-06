import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cs = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('IBT')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(cs.get('SWAGGER_PREFIX'), app, document);

  const host = cs.get('BACKEND_HOST');
  const port = cs.get('PORT');
  console.log(port);
  app.enableCors({
    origin: [cs.get('FRONTEND_APP_URL'), `http://${host}:${port}`],
    credentials: true,
  });

  app.listen(cs.get('PORT'));
}
bootstrap();
