import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  money?: number;
}
