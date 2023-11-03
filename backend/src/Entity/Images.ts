import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicId: string;

  @Column()
  url: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
