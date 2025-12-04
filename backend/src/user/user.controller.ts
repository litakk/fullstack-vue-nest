import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя через UserService
        const user = await this.userService.createUser(name, email, hashedPassword);

        // Возвращаем пользователя без пароля
        const { password: _, ...result } = user;
        return result;
    }
}
