import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { } //внедряем PrismaService, чтобы работать с базой

    async createUser(name: string, email: string, password: string) {//создаёт пользователя в таблице users
        return this.prisma.user.create({
            data: {
                id: nanoid(),
                name,
                email,
                password,
            },
        });
    }

    async findUserByEmail(email: string) {//ищет пользователя по email, чтобы можно было проверять уникальность или авторизовывать
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
