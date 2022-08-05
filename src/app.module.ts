import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { StudentModule } from './student/student.module';
import { HrUserModule } from './hr-user/hr-user.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StudentModule,
    HrUserModule,
    AuthModule,
  ],
  controllers: [AppController /* HrController */],
  providers: [AppService, RolesGuard],
})
export class AppModule {
  constructor() {}
}
