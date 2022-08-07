import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HrController } from './hr/hr.controller';
// import { HrModule } from './hr/hr.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { StudentModule } from './student/student.module';
import { HrUserModule } from './hr-user/hr-user.module';
import {AdminModule} from "./admin/admin.module";
import {ConfigModule} from "@nestjs/config";
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StudentModule,
    HrUserModule,
      AdminModule,
      ConfigModule.forRoot()
    // HrModule,
  ],
  controllers: [AppController, MailController /* HrController */],
  providers: [AppService, SendgridService],
})
export class AppModule {
  constructor() {
  }
}
