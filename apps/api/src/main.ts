import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Sanflait API')
    .setDescription('CRM, Sales Intelligence, Tracking & BI')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Health check endpoint (Railway/Docker probes)
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/api/health', (_req: unknown, res: { json: (o: object) => void }) =>
    res.json({ status: 'ok', timestamp: new Date().toISOString() }),
  );

  const port = process.env.PORT ?? 3333;
  await app.listen(port);
  console.log(`🚀 Sanflait API running on http://localhost:${port}`);
  console.log(`📘 Swagger docs at http://localhost:${port}/docs`);
}

bootstrap();
