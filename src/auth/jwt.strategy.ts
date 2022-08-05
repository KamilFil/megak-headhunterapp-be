import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentUser } from '../student/student-user.entity';
import { AuthLoginRes } from './dto/auth-login.dto';

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey:
        'awdadwad2qe12d12d2d212d 21d12d12 2 d@@!!3123C@X#2d2d13d213d12d3213d123d12',
    });
  }

  filter(user: StudentUser): AuthLoginRes {
    const { id, email, roles } = user;
    return { id, email, roles };
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await StudentUser.findOneBy({ currentTokenId: payload.id });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, this.filter(user));
  }
}
