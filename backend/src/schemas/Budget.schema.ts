import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Budget {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  maxMoney: number;

  @Prop({ required: false, default: 0 })
  spendMoney: number;

  @Prop({ required: false, default: false })
  isAlert: boolean;

  @Prop({ required: false })
  alertPoint: number;

  @Prop({ required: false, default: Date.now() })
  createdAt: Date;

  @Prop({ required: true })
  userId: string;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
