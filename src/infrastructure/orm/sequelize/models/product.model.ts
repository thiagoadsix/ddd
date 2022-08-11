import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ 
  name: { plural: "products" }, 
  timestamps: false
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false, type: "varchar" })
  declare name: string;

  @Column({ allowNull: false, type: "integer" })
  declare price: number;
}
