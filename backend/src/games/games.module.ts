import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GamesController } from './games.controller';

@Module({
  imports: [PrismaModule],
  controllers: [GamesController],
})
export class GamesModule {}

