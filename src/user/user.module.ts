import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { CacheApplication } from 'src/middlewares/set-cache.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, forwardRef(() => AuthModule)], //forwardRef() evita dependecias circulares
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({
        path: 'user/:id',
        method: RequestMethod.ALL,
      })
      .apply(CacheApplication)
      .forRoutes({
        path: 'user',
        method: RequestMethod.GET,
      });
  }
}
