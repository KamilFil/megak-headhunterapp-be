import {
  Controller,
  Inject,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { HrUser } from '../hr-user/hr-user.entity';;
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import {multerStorage, storageDir} from '../utils/storage';
import { MulterDiskUploadedFiles } from '../interfaces/files';

@Controller('admin')
export class AdminController {
  constructor(@Inject(AdminService) private adminService: AdminService) {}

  @Post('/create-hr')
  createHrByAdmin(@Query() query: HrUser) {
    return this.adminService.createHrByAdmin(query);
  }

  @Post('/upload-users-list')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'list',
          maxCount: 1,
        },
      ],
      { storage: multerStorage(path.join(storageDir(), 'users-list')) },
    ),
  )
  uploadUsersList(@UploadedFiles() files: MulterDiskUploadedFiles) {
    return this.adminService.uploadNewUsersList(files);
  }
}
