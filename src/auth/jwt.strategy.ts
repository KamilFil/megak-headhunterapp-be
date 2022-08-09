import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentUser } from '../student/student-user.entity';
import { AuthLoginRes } from './dto/auth-login.dto';
import { HrUser } from '../hr-user/hr-user.entity';
import { AdminUser } from '../admin/admin.entity';

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

  filter(user: StudentUser | HrUser | AdminUser): AuthLoginRes {
    const { id, email, roles, currentTokenId } = user;
    return { id, email, roles, currentTokenId };
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    let user: StudentUser | HrUser | AdminUser = null;

    const student = await StudentUser.findOneBy({ currentTokenId: payload.id });
    const hr = await HrUser.findOneBy({ currentTokenId: payload.id });
    const admin = await AdminUser.findOneBy({ currentTokenId: payload.id });

    if (student) {
      user = student;
    } else if (hr) {
      user = hr;
    } else if (admin) {
      user = admin;
    }

    //@Todo Sprawdź czy można po ifach dać hr / admina i nastepnie wyrzucić błąd

    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, this.filter(user));
  }
}
