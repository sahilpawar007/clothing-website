import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User"; // Assuming you have a User entity
import { Product } from "./Product";
import { Orders } from "./Order";
// import { Images } from "./Images";

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  // Not need might remove later
  // @ManyToOne(() => Images, (images) => images.orderItems)
  // @JoinColumn({ name: "productImage" })
  // images: Images[];

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Orders, (orders) => orders.orderItems)
  orders: Orders;
}
