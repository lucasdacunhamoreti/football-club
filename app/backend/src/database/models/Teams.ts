import { Model, DataTypes } from 'sequelize';
import db from '.';
import MatchesModel from './Matches';

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
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

TeamsModel.belongsTo(MatchesModel, { foreignKey: 'homeTeam', as: 'homeTeam' });
TeamsModel.belongsTo(MatchesModel, { foreignKey: 'awayTeam', as: 'awayTeam' });

MatchesModel.hasMany(TeamsModel, { foreignKey: 'homeTeam', as: 'homeTeam' });
MatchesModel.hasMany(TeamsModel, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default TeamsModel;
