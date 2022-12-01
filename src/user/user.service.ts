import { ConfigService } from '@nestjs/config';
import { InfoFacebookDto } from './dto/infoFacebook.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async facebookLogin(req) {
    if (!req.user) {
      return 'Login failed';
    }
    return {
      message: 'Connect to facebook successfully',
      user: req.user,
    };
  }

  async validateFacebookUser(payload: InfoFacebookDto) {
    const { facebookId, firstName, lastName, photo } = payload;
    const user = await this.userModel.findOne({ facebookId });
    if (!user) {
      const newUser = new this.userModel({
        facebookId,
        firstName,
        lastName,
        photo,
        password: facebookId + this.configService.get('PASSWORD_SECRET'),
        email: facebookId + this.configService.get('EMAIL_SECRET'),
      });
      await newUser.save();
      return newUser;
    }
    return user;
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ msg: string }> {
    const { email, password, firstName, lastName } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) throw new BadRequestException('Email already exists');

    const newUser = new this.userModel({
      email,
      password,
      firstName,
      lastName,
    });

    await newUser.save();
    return { msg: 'Register Success!' };
  }

  async signIn(
    signInUserDto: SignInUserDto,
  ): Promise<{ msg: string; user: SignInUserDto }> {
    const { email, password } = signInUserDto;
    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) throw new BadRequestException('email or password incorrect');

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) throw new BadRequestException('email or password incorrect');

    return { msg: 'Login Success!', user: user };
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
