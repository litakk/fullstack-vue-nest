// src/multiplayer_game/tic-tac-toe.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MultiplayerTicTacToeService } from './tic-tac-toe.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class TicTacToeGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly tttService: MultiplayerTicTacToeService) {}

  @SubscribeMessage('joinGame')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; playerId: string },
  ) {
    try {
      const game = await this.tttService.joinGame(data.gameId, data.playerId);
      client.join(data.gameId);
      this.server.to(data.gameId).emit('gameUpdate', game);
      return { status: 'ok', game };
    } catch (e: any) {
      return { status: 'error', message: e?.message || 'join failed' };
    }
  }

  @SubscribeMessage('makeMove')
  async handleMove(
    @MessageBody() data: { gameId: string; playerId: string; index: number },
  ) {
    try {
      const game = await this.tttService.makeMove(
        data.gameId,
        data.playerId,
        data.index,
      );
      this.server.to(data.gameId).emit('gameUpdate', game);
      return { status: 'ok' };
    } catch (e: any) {
      return { status: 'error', message: e?.message || 'move failed' };
    }
  }
}