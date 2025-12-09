// src/multiplayer_game/tic-tac-toe.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MultiplayerTicTacToeController } from './tic-tac-toe.controller';
import { MultiplayerTicTacToeService } from './tic-tac-toe.service';
import { TicTacToeGateway } from './tic-tac-toe.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [MultiplayerTicTacToeController],
  providers: [MultiplayerTicTacToeService, TicTacToeGateway],
})
export class MultiplayerGameModule {}
