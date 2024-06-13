import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  money: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: true })
  userId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
