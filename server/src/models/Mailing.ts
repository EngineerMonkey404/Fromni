import {
  Column,
  PrimaryKey,
  Table,
  Model,
  AutoIncrement,
  AllowNull,
  DataType,
} from 'sequelize-typescript';
import { ButtonsInterface } from '../types/buttons.interface';

@Table({})
export default class Mailing extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column(DataType.JSON)
  buttons: ButtonsInterface;

  @Column
  user: string;

  @Column(DataType.JSON)
  messages: Record<string, string>;
}
