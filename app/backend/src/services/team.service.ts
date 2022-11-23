import HttpException from '../utils/http.exception';
import mapError from '../utils/mapError';
import TeamModel from '../models/team.model';

export default class TeamService {
  private teamModel: TeamModel;

  constructor() {
    this.teamModel = new TeamModel();
  }

  public getAllTeams = async () => {
    const teams = await this.teamModel.getAllTeams();
    return teams;
  };

  public getOneTeam = async (id: number) => {
    const team = await this.teamModel.getOneTeam(id);
    if (!team) throw new HttpException(mapError('notFound'), 'Team not exist');
    return team;
  };
}
