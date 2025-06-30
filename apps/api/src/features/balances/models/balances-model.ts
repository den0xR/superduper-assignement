import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export class Balance extends Model<InferAttributes<Balance>, InferCreationAttributes<Balance>> {
  declare walletAddress: string;
  declare tokenContractAddress: string;
  declare tokenSymbol: string;
}

export function initBalanceModel(sequelize: Sequelize): typeof Balance {
  Balance.init(
    {
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tokenContractAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tokenSymbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      modelName: "Balance",
      tableName: "balances",
      sequelize
    }
  );
  
  return Balance;
}

export default Balance;
