// PaymentInfo.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { Orders } from "./Order";

export interface PaymentInfoType {
  id: number;
  paymentId: string;
  status: "succeeded" | "failed";
  user: User;
}

@Entity()
export class PaymentInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentId: string;

  @Column()
  status: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  paidAt: Date;

  @ManyToOne(() => User, (user) => user.paymentInfo)
  @JoinColumn()
  user: User;

  @OneToOne(() => Orders)
  @JoinColumn({ name: "orderId" })
  order: Orders;
}
