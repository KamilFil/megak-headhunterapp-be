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
import { AdminUser } from '../admin/admin.entity';

@Injectable()
export class AuthService {
  private static async createToken(currentTokenId: string): Promise<{
    accessToken: string;
    expiresIn: number;
  }> {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 24;
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

  private static async generateToken(
    user: StudentUser | HrUser | AdminUser,
  ): Promise<string> {
    let token;
    let userWithThisToken = null;

    if (user.roles === Role.Student) {
      do {
        token = uuid();
        userWithThisToken = await StudentUser.findOneBy({
          currentTokenId: token,
        });
      } while (!!userWithThisToken);

      user.currentTokenId = token;
      await user.save();
      return token;
    } else if (user.roles === Role.Hr) {
      do {
        token = uuid();
        userWithThisToken = await HrUser.findOneBy({
          currentTokenId: token,
        });
      } while (!!userWithThisToken);
      user.currentTokenId = token;
      await user.save();
      return token;
    } else if (user.roles === Role.Admin) {
      do {
        token = uuid();
        userWithThisToken = await StudentUser.findOneBy({
          currentTokenId: token,
        });
      } while (!!userWithThisToken);

      user.currentTokenId = token;
      await user.save();
      return token;
    }
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    let user: StudentUser | HrUser | AdminUser = null;

    try {
      const student = await StudentUser.findOneBy({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });

      const hr = await HrUser.findOneBy({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });
      const admin = await AdminUser.findOneBy({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });

      if (student) {
        user = student;
      } else if (hr) {
        user = hr;
      } else if (admin) {
        user = admin;
      }

      if (!user) {
        return res.json({ error: 'Invalid login data!', status: 404 });
      }
      const token = await AuthService.createToken(
        await AuthService.generateToken(user),
      );

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true, roles: user.roles });
    } catch (e) {
      return res.json({ error: 'Cookie res' });
    }
  }

  async logout(user: StudentUser | HrUser | AdminUser, res: Response) {
    console.log('To jest user w wylogowaniu', user);
    try {
      if (user.roles === Role.Student) {
        user.currentTokenId = null;
        await StudentUser.save(user);
        res.clearCookie('jwt', {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        });
      } else if (user.roles === Role.Hr) {
        user.currentTokenId = null;
        await HrUser.save(user);
        res.clearCookie('jwt', {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        });
      } else if (user.roles === Role.Admin) {
        user.currentTokenId = null;
        await AdminUser.save(user);
        res.clearCookie('jwt', {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        });
      }

      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: 'Bład' });
    }
  }
}
