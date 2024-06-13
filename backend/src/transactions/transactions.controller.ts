import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTransactionDto } from './dtos/CreateTransaction.dto';
import { TransactionsService } from './transactions.service';
import mongoose from 'mongoose';
import { UpdateTransactionDto } from './dtos/UpdateTransaction.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const { type } = createTransactionDto;
    if (type !== 'Income' && type !== 'Expense')
      throw new HttpException('Transaction Type Not Valid', 400);
    return this.transactionsService.createNewTransaction(createTransactionDto);
  }

  @Get()
  async getAllTransaction(@Query() query) {
    console.log(query);
    return await this.transactionsService.getAllTransaction(query);
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpException('Id Not Valid', 400);
    const transaction = await this.transactionsService.getTransactionById(id);
    if (!transaction) throw new HttpException('Transaction Not Found', 404);
    return transaction;
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    const tranIdIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!tranIdIsValid) throw new HttpException('Id Not Valid', 400);
    const deletedTransaction =
      await this.transactionsService.deleteTransaction(id);
    if (!deletedTransaction)
      throw new HttpException('Transaction Not Found', 404);
    return deletedTransaction;
  }

  @Patch(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpException('Id Not Valid', 400);
    const updatedTransaction = await this.transactionsService.updateTransaction(
      id,
      updateTransactionDto,
    );
    if (!updatedTransaction)
      throw new HttpException('Transaction Not Found', 404);
    return updatedTransaction;
  }
}
