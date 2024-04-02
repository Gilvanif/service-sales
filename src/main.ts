import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      whitelist: true,
    }),
  );

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE') ?? '')
    .setDescription(configService.get('SWAGGER_DESCRIPTION') ?? '')
    .setVersion(configService.get('SWAGGER_API_VERSION') ?? '')
    .addSecurityRequirements('ApiKeyAuth')
    .build();

  const route = configService.get('SWAGGER_ROUTE') ?? '/doc';
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(route, app, document, {
    swaggerOptions: {
      supportedSubmitMethods: [],
      defaultModelsExpandDepth: -1,
    },
  });

  app.enableCors({
    methods: ['POST', 'GET'],
    credentials: true,
  });

  const port = configService.get('SERVER_PORT') ?? 3050;
  await app.listen(port);
}
bootstrap();
