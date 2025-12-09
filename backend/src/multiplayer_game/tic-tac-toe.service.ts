// src/multiplayer_game/tic-tac-toe.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { GameStatus, PlayerSymbol, TicTac } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MultiplayerTicTacToeService {
  constructor(private prisma: PrismaService) {}

  async createGame(playerId: string): Promise<TicTac> {
    if (!playerId) throw new BadRequestException('playerId is required');

    return this.prisma.ticTac.create({
      data: {
        playerXId: playerId,
        status: GameStatus.waiting,
        isBotGame: false,
      },
    });
  }

  async joinGame(gameId: string, playerId: string): Promise<TicTac> {
    const game = await this.prisma.ticTac.findUnique({ where: { id: gameId } });
    if (!game) throw new BadRequestException('Game not found');
    if (game.isBotGame) throw new BadRequestException('Bot game cannot be joined');

    if (game.playerXId === playerId || game.playerOId === playerId) {
      // повторное подключение
      return game;
    }

    if (game.playerOId) throw new BadRequestException('Game already full');

    if (game.status !== GameStatus.waiting)
      throw new BadRequestException('Game already started');

    return this.prisma.ticTac.update({
      where: { id: gameId },
      data: { playerOId: playerId, status: GameStatus.playing },
    });
  }

  async makeMove(
    gameId: string,
    playerId: string,
    index: number,
  ): Promise<TicTac> {
    const game = await this.prisma.ticTac.findUnique({ where: { id: gameId } });
    if (!game) throw new BadRequestException('Game not found');
    if (game.isBotGame) throw new BadRequestException('Not a multiplayer game');
    if (game.status !== GameStatus.playing)
      throw new BadRequestException('Game is not active');
    if (!game.playerOId)
      throw new BadRequestException('Waiting for opponent to join');

    const boardArr = game.board.split('');
    const symbol =
      game.playerXId === playerId
        ? PlayerSymbol.X
        : game.playerOId === playerId
          ? PlayerSymbol.O
          : null;
    if (!symbol) throw new BadRequestException('Not your game');
    if (game.currentTurn !== symbol)
      throw new BadRequestException('Not your turn');
    if (index < 0 || index > 8)
      throw new BadRequestException('Invalid cell index');
    if (boardArr[index] !== '-') throw new BadRequestException('Cell occupied');

    boardArr[index] = symbol;

    let status: GameStatus = GameStatus.playing;
    let winner: PlayerSymbol | null = null;
    const lastMove: PlayerSymbol = symbol;

    if (this.checkWin(boardArr, symbol)) {
      status = GameStatus.won;
      winner = symbol;
    } else if (!boardArr.includes('-')) {
      status = GameStatus.draw;
    }

    const nextTurn = symbol === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;

    return this.prisma.ticTac.update({
      where: { id: gameId },
      data: {
        board: boardArr.join(''),
        status,
        winner,
        currentTurn: status === GameStatus.playing ? nextTurn : lastMove,
      },
    });
  }

  async getGame(gameId: string): Promise<TicTac | null> {
    return this.prisma.ticTac.findUnique({ where: { id: gameId } });
  }

  async listWaitingGames(): Promise<TicTac[]> {
    return this.prisma.ticTac.findMany({
      where: { status: GameStatus.waiting, isBotGame: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  private checkWin(board: string[], s: PlayerSymbol) {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return win.some((p) => p.every((i) => board[i] === s));
  }
}
