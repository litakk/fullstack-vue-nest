import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('games')
export class GamesController {
  constructor(private prisma: PrismaService) {}

  @Get(':id')
  getGame(@Param('id') id: string) {
    return this.prisma.ticTac.findUnique({ where: { id } });
  }
}

