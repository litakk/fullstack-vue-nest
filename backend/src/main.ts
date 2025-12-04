import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS
  app.enableCors({
    origin: 'http://localhost:5173', // разрешаем фронтенд с Vite
    credentials: true,               // если нужны cookies/authorization
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
