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
export default class Message extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  text: string;

  @Column
  user: string;

  @Column
  messenger: string;

  @AllowNull
  @Column(DataType.JSON)
  buttons: ButtonsInterface;
}
