import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reviews } from "./Reviews";
import { Images } from "./Images";
import { OrderItems } from "./OrderItems";

export interface ProductType {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  Stock: number;
  ratings: number;
  numOfReviews: number;
  createdAt: Date;
  reviews: Reviews[];
  images?: Images[];
  orderItems: OrderItems[];
}

@Entity()
export class Product implements ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  Stock: number;

  @Column({ default: 0 })
  ratings: number;

  @Column({ default: 0 })
  numOfReviews: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Reviews, (reviews) => reviews.product, { cascade: true })
  reviews: Reviews[];

  @OneToMany(() => Images, (images) => images.product)
  images: Images[];

  @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  orderItems: OrderItems[];
}
