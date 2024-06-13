import {
  Get,
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBudgetDto } from './dtos/CreateBudget.dto';
import { BudgetsService } from './budgets.service';
import mongoose from 'mongoose';
import { HttpException } from '@nestjs/common';
import { UpdateBudgetDto } from './dtos/UpdateBudget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private budgetsService: BudgetsService) {}

  @Post()
  async createBudget(@Body() createBudgetDto: CreateBudgetDto) {
    return await this.budgetsService.createNewBudget(createBudgetDto);
  }

  @Patch(':id')
  async updateBudget(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {}

  @Get()
  async getAllBudget(@Query('userId') userId: string) {
    return await this.budgetsService.getAll({ userId });
  }

  @Get(':id')
  async getBudget(@Param('id') id: string) {
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpException('Id Not Valid', 400);
    const budget = await this.budgetsService.getById(id);
    if (!budget) throw new HttpException('Budget Not Found', 404);
    return budget;
  }

  @Delete(':id')
  async deleteBudget(@Param('id') id: string) {
    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpException('Id Not Valid', 400);
    const deletedBudget = await this.budgetsService.deleteBudget(id);
    if (!deletedBudget) throw new HttpException('Budget Not Found', 404);
    return deletedBudget;
  }
}
