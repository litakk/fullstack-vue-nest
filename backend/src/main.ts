import 'dotenv/config';           // Загружаем переменные из .env
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Создаём приложение Nest
  const app = await NestFactory.create(AppModule);

  // Включаем CORS для фронтенда (Vite на localhost:5173)
  app.enableCors({
    origin: 'https://tic-tac-toe-gamma-tan-42.vercel.app', // разрешаем фронтенд
    credentials: true,               // если используем cookies/Authorization
  });

  // Берём порт из .env или по умолчанию 3000
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}`);
}

bootstrap();
