import { Test, TestingModule } from '@nestjs/testing';
import { HrUserController } from './hr-user.controller';

describe('HrUserController', () => {
  let controller: HrUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrUserController],
    }).compile();

    controller = module.get<HrUserController>(HrUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
