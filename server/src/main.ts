import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from './utils/exceptionFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3001;

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: configService.get<string>('CLIENT_BASE_URL'),
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Shop')
    .setDescription("Pillow's shop documentation")
    .setVersion('1.0.0')
    .addTag('shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
}
bootstrap();
