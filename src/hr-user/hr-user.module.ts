import { Module } from '@nestjs/common';
import { HrUserController } from './hr-user.controller';
import { HrUserService } from './hr-user.service';

@Module({
  controllers: [HrUserController],
  providers: [HrUserService]
})
export class HrUserModule {}
