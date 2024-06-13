import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from 'src/schemas/Budget.schema';
import { User } from 'src/schemas/User.schema';
import { CreateBudgetDto } from './dtos/CreateBudget.dto';
import { Transaction } from 'src/schemas/Transaction.schema';
import { UsersService } from 'src/users/users.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<Budget>,
    private usersService: UsersService,
    private transactionsService: TransactionsService,
  ) {}

  calculateSpendMoney(transactionList: Transaction[]) {
    return transactionList.reduce((result, element) => {
      return result + element.money;
    }, 0);
  }

  async createNewBudget(createBudgetDto: CreateBudgetDto) {
    const user = await this.usersService.findById(createBudgetDto.userId);
    if (!user) throw new HttpException('User Not Found', 404);
    const { categoryName } = createBudgetDto;
    const transactions = await this.transactionsService.getTransactionsByUserId(
      createBudgetDto.userId,
    );
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.categoryName === categoryName;
    });
    const spendMoney = this.calculateSpendMoney(filteredTransactions);
    const newBudget = new this.budgetModel({
      ...createBudgetDto,
      spendMoney: spendMoney,
    });
    return await newBudget.save();
  }

  async getAll(condition: Object) {
    return await this.budgetModel.find(condition);
  }

  async getById(id: string) {
    return await this.budgetModel.findById(id);
  }

  async deleteBudget(id: string) {
    return await this.budgetModel.findByIdAndDelete(id);
  }
}
