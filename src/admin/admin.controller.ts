import {
  Body,
  Controller, Get,
  Inject,
  Post,
  Query,
  UploadedFiles, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { HrUser } from '../hr-user/hr-user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { multerStorage, storageDir } from '../utils/storage';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../guards/roles.guard";
import {Roles} from "../decorators/roles.decorator";
import {Role} from "../../types/auth/role.enum";

@Controller('admin')
export class AdminController {
  constructor(@Inject(AdminService) private adminService: AdminService) {}

  @Post('/create-hr')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createHrByAdmin(@Body() body: HrUser) {
    return this.adminService.createHrByAdmin(body);
  }

  @Post('/upload-users-list')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
