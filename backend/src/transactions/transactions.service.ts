import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { Transaction } from 'src/schemas/Transaction.schema';
import { CreateTransactionDto } from './dtos/CreateTransaction.dto';
import { HttpException } from '@nestjs/common';
import { UpdateTransactionDto } from './dtos/UpdateTransaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async createNewTransaction(createTransactionDto: CreateTransactionDto) {
    const findUser = await this.userModel.findById(createTransactionDto.userId);
    if (!findUser) throw new HttpException('User Not Found', 404);
    const newTransaction = new this.transactionModel(createTransactionDto);
    return await newTransaction.save();
  }

  async getAllTransaction(query) {
    const { sortMoney, sortTime, limit, filterTime, ...rest } = query;

    const sortObj = sortMoney
      ? sortTime
        ? { money: sortMoney, createdAt: sortTime }
        : { money: sortMoney }
      : sortTime
        ? { createdAt: sortTime }
        : {};

    if (!filterTime) {
      return await this.transactionModel.find(rest).sort(sortObj).limit(limit);
    } else {
      const date = new Date();
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth();
      const dateData = date.getDate();
      const currentDay = date.getDay();

      console.log(currentYear, currentMonth, dateData, currentDay);

      const whereObj = {
        ...rest,
        createdAt: {
          $gte: '',
          $lte: '',
        },
      };

      switch (filterTime) {
        case 'Today':
          whereObj.createdAt = {
            $gte: new Date(currentYear, currentMonth, dateData),
            $lt: new Date(currentYear, currentMonth, dateData + 1),
          };
          break;
        case 'Week':
          whereObj.createdAt = {
            $gte: new Date(
              currentYear,
              currentMonth,
              dateData - currentDay + 2,
            ),
            $lt: new Date(currentYear, currentMonth, dateData + 9 - currentDay),
          };
          break;
        case 'Month':
          whereObj.createdAt = {
            $gte: new Date(currentYear, currentMonth),
            $lt: new Date(currentYear, currentMonth + 1),
          };
          break;
        case 'Year':
          whereObj.createdAt = {
            $gte: new Date(currentYear, 0),
            $lt: new Date(currentYear + 1, 0),
          };
          break;
      }

      console.log(whereObj);
      return await this.transactionModel
        .find(whereObj)
        .sort(sortObj)
        .limit(limit);
    }

    // const resPerPage = 3;
    // const currentPage = Number(query.page) || 1;
    // const skip = resPerPage * (currentPage - 1);

    // const categoryName = query.categoryName
    //   ? {
    //       categoryName: {
    //         $regex: query.categoryName,
    //         $options: 'i',
    //       },
    //     }
    //   : {};
    // return this.transactionModel
    //   .find({ ...categoryName })
    //   .limit(resPerPage)
    //   .skip(skip);

    // if (limit) {
    //   return await this.transactionModel
    //     .find(whereObj)
    //     .sort(sortObj)
    //     .limit(limit);
    // } else {
    //   return await this.transactionModel.find(whereObj).sort(sortObj);
    // }
  }

  getTransactionById(id: string) {
    return this.transactionModel.findById(id);
  }

  async getTransactionsByUserId(userId: string) {
    return await this.transactionModel.find({ userId });
  }

  async deleteTransaction(transactionId: string) {
    const deletedTransaction =
      await this.transactionModel.findByIdAndDelete(transactionId);
    return deletedTransaction;
  }

  updateTransaction(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionModel.findByIdAndUpdate(id, updateTransactionDto, {
      new: true,
    });
  }
}
