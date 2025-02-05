import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { RefectoryStatusEnum } from 'src/ts/enums';
import { Menu } from './menu.schema';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Refectory extends Document {
  @Prop({ default: RefectoryStatusEnum.scheduled })
  @ApiProperty({ enum: RefectoryStatusEnum })
  status: RefectoryStatusEnum;

  @Prop()
  @ApiProperty()
  vigencyDate: number;

  @Prop()
  @ApiProperty()
  startAnswersDate: number;

  @Prop({ type: Object })
  @ApiProperty()
  menu: Menu;
}

export const RefectorySchema = SchemaFactory.createForClass(Refectory);
