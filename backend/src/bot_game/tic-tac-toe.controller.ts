import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BotTicTacToeService } from './tic-tac-toe.service';

@Controller('tic-tac-toe')
export class BotTicTacToeController {
  constructor(private readonly tttService: BotTicTacToeService) {}

  @Post('create')
  create(
    @Body('playerId') playerId: string,
    @Body('botLevel') botLevel?: string,
  ) {
    return this.tttService.createGame(playerId, botLevel);
  }

  @Get(':gameId')
  get(@Param('gameId') gameId: string) {
    return this.tttService.getGame(gameId);
  }

  @Post('move/:gameId')
  makeMove(
    @Param('gameId') gameId: string,
    @Body('index') index: number,
    @Body('playerId') playerId?: string,
  ) {
    return this.tttService.makeMove(gameId, index, playerId);
  }
}
