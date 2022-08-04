import {Module, Post} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { StudentModule } from './student/student.module';
import { HrUserModule } from './hr-user/hr-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StudentModule,
    HrUserModule,
    AuthModule,
    // HrModule,
  ],
  controllers: [AppController /* HrController */],
  providers: [AppService],
})
export class AppModule {
  constructor() {
  }
}
