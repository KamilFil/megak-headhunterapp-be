import { forwardRef, Module } from '@nestjs/common';
import { HrUserController } from './hr-user.controller';
import { HrUserService } from './hr-user.service';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [forwardRef(() => StudentModule)],
  controllers: [HrUserController],
  providers: [HrUserService],
})
export class HrUserModule {}
