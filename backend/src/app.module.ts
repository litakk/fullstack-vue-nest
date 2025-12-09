import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotGameModule } from './bot_game/tic-tac-toe.controller.module';
import { GamesModule } from './games/games.module';
import { MultiplayerGameModule } from './multiplayer_game/tic-tac-toe.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PrismaModule, UserModule, BotGameModule, MultiplayerGameModule, GamesModule],
})
export class AppModule {}
