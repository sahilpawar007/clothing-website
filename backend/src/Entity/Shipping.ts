// ShippingInfo.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Orders } from "./Order";

export interface ShippingInfoType {
  id: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  phoneNo: string;
  user: User;
  orders: Orders;
}

@Entity()
export class ShippingInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  pinCode: number;

  @Column()
  phoneNo: string;

  @ManyToOne(() => User, (user) => user.shippingInfo)
  @JoinColumn()
  user: User;

  @OneToMany(() => Orders, (orders) => orders.shippingInfo)
  orders: Orders[];
}
