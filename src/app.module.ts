import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { StudentModule } from './student/student.module';
import { HrUserModule } from './hr-user/hr-user.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/roles.guard';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StudentModule,
    HrUserModule,
    AdminModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {
  constructor() {}
}
