import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotTicTacToeController } from './tic-tac-toe.controller';
import { BotTicTacToeService } from './tic-tac-toe.service';

@Module({
  imports: [PrismaModule],
  controllers: [BotTicTacToeController],
  providers: [BotTicTacToeService],
})
export class BotGameModule {}
