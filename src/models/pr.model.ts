import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface PullRequest {
  prid?: number;
  status: string;
  response?: string;
}

interface UserCreationAttributes extends Optional<PullRequest, "prid"> {}

class PR
  extends Model<PullRequest, UserCreationAttributes>
  implements PullRequest
{
  public prid!: number;
  public status!: string;
  public response!: string;
}

PR.init(
  {
    prid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "pullrequests",
  },
);

export default PR;
