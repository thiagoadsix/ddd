import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ 
  name: { plural: "customers" }, 
  timestamps: false
})
export class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false, type: "varchar" })
  declare name: string;

  @Column({ allowNull: false, type: "boolean", defaultValue: false })
  declare active: boolean;

  @Column({ allowNull: false, type: "integer", defaultValue: 0 })
  declare rewardPoints: number;

  @Column({ allowNull: false, type: "varchar" })
  declare street: string;

  @Column({ allowNull: false, type: "integer" })
  declare number: number;

  @Column({ allowNull: false, type: "varchar" })
  declare zip: string;

  @Column({ allowNull: false, type: "varchar" })
  declare city: string;

  @Column({ allowNull: false, type: "varchar" })
  declare country: string;

  @Column({ allowNull: false, type: "varchar" })
  declare state: string;
}
