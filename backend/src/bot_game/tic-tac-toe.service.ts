import { BadRequestException, Injectable } from '@nestjs/common';
import { GameStatus, PlayerSymbol, TicTac } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BotTicTacToeService {
  constructor(private prisma: PrismaService) {}

  async createGame(playerId: string, botLevel?: string): Promise<TicTac> {
    if (!playerId) throw new BadRequestException('playerId is required');

    return this.prisma.ticTac.create({
      data: {
        playerXId: playerId,
        isBotGame: true,
        botLevel: botLevel || null,
        status: GameStatus.playing,
        currentTurn: PlayerSymbol.X,
      },
    });
  }

  async getGame(gameId: string): Promise<TicTac | null> {
    return this.prisma.ticTac.findUnique({ where: { id: gameId } });
  }

  async makeMove(
    gameId: string,
    playerMoveIndex: number,
    playerId?: string,
  ): Promise<TicTac> {
    const game = await this.getGame(gameId);
    if (!game || !game.isBotGame)
      throw new BadRequestException('Game not found');
    if (game.status !== GameStatus.playing)
      throw new BadRequestException('Game already finished');
    if (game.playerXId !== (playerId || game.playerXId))
      throw new BadRequestException('Not your game');
    if (game.currentTurn !== PlayerSymbol.X)
      throw new BadRequestException('Wait for your turn');
    if (playerMoveIndex < 0 || playerMoveIndex > 8)
      throw new BadRequestException('Invalid cell index');

    const boardArr = game.board.split('');
    if (boardArr[playerMoveIndex] !== '-')
      throw new BadRequestException('Cell occupied');

    boardArr[playerMoveIndex] = PlayerSymbol.X;

    let status: GameStatus = GameStatus.playing;
    let winner: PlayerSymbol | null = null;
    let currentTurn: PlayerSymbol = PlayerSymbol.X;
    let lastMove: PlayerSymbol = PlayerSymbol.X;

    if (this.checkWin(boardArr, PlayerSymbol.X)) {
      status = GameStatus.won;
      winner = PlayerSymbol.X;
    } else if (!boardArr.includes('-')) {
      status = GameStatus.draw;
    } else {
      // ход бота
      const robotMoveIndex = this.getRandomMove(boardArr);
      if (robotMoveIndex !== -1) {
        boardArr[robotMoveIndex] = PlayerSymbol.O;
        lastMove = PlayerSymbol.O;
      }

      if (this.checkWin(boardArr, PlayerSymbol.O)) {
        status = GameStatus.won;
        winner = PlayerSymbol.O;
      } else if (!boardArr.includes('-')) {
        status = GameStatus.draw;
      } else {
        currentTurn = PlayerSymbol.X;
      }
    }

    return this.prisma.ticTac.update({
      where: { id: gameId },
      data: {
        board: boardArr.join(''),
        status,
        winner,
        currentTurn: status === GameStatus.playing ? currentTurn : lastMove,
      },
    });
  }

  private checkWin(board: string[], symbol: PlayerSymbol): boolean {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // строки
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // колонки
      [0, 4, 8],
      [2, 4, 6], // диагонали
    ];
    return winPatterns.some((pattern) =>
      pattern.every((i) => board[i] === symbol),
    );
  }

  private getRandomMove(board: string[]): number {
    const emptyIndices = board
      .map((v, i) => (v === '-' ? i : -1))
      .filter((i) => i !== -1);
    if (emptyIndices.length === 0) return -1;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }
}
