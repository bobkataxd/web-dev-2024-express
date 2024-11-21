import { DataTypes, Model, Sequelize, Optional, HasOneSetAssociationMixin, HasOneGetAssociationMixin } from 'sequelize';
import { University } from '../university/university';

interface SubjectAttributes {
  id: number;
  name: string;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> {}

export class Subject extends Model<SubjectAttributes, SubjectCreationAttributes> implements SubjectAttributes {
  public id!: number;
  public name!: string;
}

export const SubjectModel = (sequelize: Sequelize) => {
  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'Subjects',
    }
  );

  return Subject;
};
