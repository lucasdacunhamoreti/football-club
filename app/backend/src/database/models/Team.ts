import { Model, DataTypes } from 'sequelize';
import db from '.';
import MatchesModel from './Match';

class TeamsModel extends Model {
  id!: number;
  teamName!: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'teams',
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'teamAway' });

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default TeamsModel;
