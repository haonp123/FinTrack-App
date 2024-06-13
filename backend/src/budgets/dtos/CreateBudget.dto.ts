import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsNotEmpty()
  @IsNumber()
  maxMoney: number;

  @IsOptional()
  @IsBoolean()
  isAlert: boolean;

  @IsOptional()
  @IsNumber()
  alertPoint: number;
}
