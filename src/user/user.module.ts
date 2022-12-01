import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './entity/user.entity';
import { UserController } from './user.controller';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, FacebookStrategy],
  exports: [MongooseModule],
  controllers: [UserController],
})
export class UserModule {}
