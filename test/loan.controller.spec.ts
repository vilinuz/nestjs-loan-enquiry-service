import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from '../src/loan/loan.controller';
import { LoanService } from '../src/loan/loan.service';

describe('LoanController', () => {
  let loanController: LoanController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [LoanService],
    }).compile();

    loanController = app.get<LoanController>(LoanController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(loanController.getHello()).toBe('Hello World!');
    });
  });
});
