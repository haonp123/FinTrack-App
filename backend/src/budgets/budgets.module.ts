import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Budget, BudgetSchema } from 'src/schemas/Budget.schema';
import { User, UserSchema } from 'src/schemas/User.schema';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Transaction, TransactionSchema } from 'src/schemas/Transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Budget.name,
        schema: BudgetSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [BudgetsService, UsersService, TransactionsService],
  controllers: [BudgetsController],
})
export class BudgetsModule {}
