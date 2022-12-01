import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyFunction } from 'passport-facebook';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL:
        'https://84df-123-16-222-133.ap.ngrok.io/auth/facebook/callback',
      enableProof: true,
      display: 'popup',
      profileFields: [
        'id',
        'email',
        'photos',
        'birthday',
        'first_name',
        'last_name',
      ],
    });
  }

  validate: VerifyFunction = async (
    _accessToken,
    _refreshToken,
    profile,
    done,
  ): Promise<void> => {
    const { name, photos } = profile;
    const payload = {
      facebookId: profile.id,
      firstName: name.familyName,
      lastName: name.givenName,
      photo: photos[0].value,
    };
    const user = await this.userService.validateFacebookUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    done(null, user);
  };
}
