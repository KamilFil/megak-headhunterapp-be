import {Controller, Get, Inject, Param, Post, Query} from '@nestjs/common';
import {AdminService} from "./admin.service";
import {HrUser} from "../hr-user/hr-user.entity";

@Controller('admin')
export class AdminController {
    constructor(
        @Inject(AdminService) private adminService: AdminService
    ) {
    }

    @Post('/create-hr')
    createHrByAdmin(
        @Query() query: HrUser
    ) {
        return this.adminService.createHrByAdmin(query);
    }


}
