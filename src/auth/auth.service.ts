import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { StudentUser } from '../student/student-user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { HrUser } from '../hr-user/hr-user.entity';
import { Role } from 'types/auth/role.enum';

@Injectable()
export class AuthService {
  private async createToken(currentTokenId: string): Promise<{
    accessToken: string;
    expiresIn: number;
  }> {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
      payload,
      'awdadwad2qe12d12d2d212d 21d12d12 2 d@@!!3123C@X#2d2d13d213d12d3213d123d12',
      { expiresIn },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: StudentUser | HrUser): Promise<string> {
    let token;
    let userWithThisToken = null;
    if (user.roles === Role.Student) {
      do {
        token = uuid();
        userWithThisToken = await StudentUser.findOneBy({
          currentTokenId: token,
        });
      } while (!!userWithThisToken);
    } else if (user.roles === Role.Hr) {
      do {
        token = uuid();
        userWithThisToken = await StudentUser.findOneBy({
          currentTokenId: token,
        });
      } while (!!userWithThisToken);
    }

    user.currentTokenId = token;
    await user.save();
    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    let user: StudentUser | HrUser = null;

    try {
      const student = await StudentUser.findOneBy({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });

      const hr = await HrUser.findOneBy({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });

      if (student) {
        user = student;
      } else if (hr) {
        user = hr;
      }

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }
      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
