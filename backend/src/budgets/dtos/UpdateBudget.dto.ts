import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBudgetDto {
  @IsOptional()
  @IsString()
  categoryName: string;

  @IsOptional()
  @IsNumber()
  maxMoney: number;

  @IsOptional()
  @IsBoolean()
  isAlert: boolean;

  @IsOptional()
  @IsNumber()
  alertPoint: number;
}
