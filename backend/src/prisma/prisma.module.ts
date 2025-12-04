import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()//Делает этот модуль глобальным
@Module({
    providers: [PrismaService],//сообщает Nest.js, что PrismaService может быть внедрён в другие классы через DI
    exports: [PrismaService],//позволяет другим модулям использовать PrismaService
})
export class PrismaModule { }
