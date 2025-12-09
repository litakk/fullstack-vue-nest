// src/multiplayer_game/tic-tac-toe.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MultiplayerTicTacToeService } from './tic-tac-toe.service';

@Controller('multiplayer-tic-tac-toe')
export class MultiplayerTicTacToeController {
  constructor(private readonly ttt: MultiplayerTicTacToeService) {}

  @Post('create')
  create(@Body('playerId') playerId: string) {
    return this.ttt.createGame(playerId);
  }

  @Post('join/:gameId')
  join(
    @Param('gameId') gameId: string,
    @Body('playerId') playerId: string,
  ) {
    return this.ttt.joinGame(gameId, playerId);
  }

  @Get('available')
  available() {
    return this.ttt.listWaitingGames();
  }

  @Get(':gameId')
  getOne(@Param('gameId') gameId: string) {
    return this.ttt.getGame(gameId);
  }
}
