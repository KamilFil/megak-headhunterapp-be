import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { StudentUser } from '../student/student-user.entity';
import { HrUser } from '../hr-user/hr-user.entity';
import { UserObj } from '../decorators/user-obj.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../types/auth/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: StudentUser | HrUser, @Res() res: Response) {
    return this.authService.logout(user, res);
  }

  @Get('/user/:currentTokenId')
  @UseGuards(AuthGuard('jwt'))
  async getUserByCurrentTokenId(
    @Param('currentTokenId') currentTokenId: string,
    @Res() res: Response,
  ) {
    return this.authService.getUserByCurrentTokenId(currentTokenId, res);
  }
}
