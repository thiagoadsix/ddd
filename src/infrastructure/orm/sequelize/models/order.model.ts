import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CustomerModel } from "./customer.model"

@Table({ 
  name: { singular: "orders" }, 
  timestamps: false
})
export class OderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false, field: "customer_id" })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel

  @PrimaryKey
  @Column({ allowNull: false, type: "integer" })
  declare total: number;
}
