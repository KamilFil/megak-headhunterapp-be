import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HrController } from './hr/hr.controller';
// import { HrModule } from './hr/hr.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StudentModule,
    AdminModule,
    // HrModule,
  ],
  controllers: [AppController /* HrController */],
  providers: [AppService],
})
export class AppModule {}
