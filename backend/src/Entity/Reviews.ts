import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

export interface ReviewsType {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user?: User;
  product?: Product;
}

@Entity()
export class Reviews implements ReviewsType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.reviews, {
    eager: false,
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user: User;
}
