import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./User"; // Assuming you have a User entity
import { ShippingInfo } from "./Shipping";
import { OrderItems } from "./OrderItems";

export interface OrderType {
  id: number;
  shippingInfo: ShippingInfo;
  orderItems: OrderItems[];
  user: User;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus?: string;
  deliveredAt?: Date;
  createdAt?: Date;
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShippingInfo, (shippingInfo) => shippingInfo.orders)
  @JoinColumn({ name: "shippingInfo" })
  shippingInfo: ShippingInfo;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.orders, {
    cascade: true,
  })
  orderItems: OrderItems[];

  @Column({ default: 0 })
  itemsPrice: number;

  @Column({ default: 0 })
  taxPrice: number;

  @Column({ default: 0 })
  shippingPrice: number;

  @Column({ default: 0 })
  totalPrice: number;

  @Column({ default: "Processing" })
  orderStatus: string;

  @Column({ nullable: true })
  deliveredAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
