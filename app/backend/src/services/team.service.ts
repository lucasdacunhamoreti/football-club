import HttpException from '../utils/http.exception';
import StatusCode from '../utils/StatusCode';
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
    if (!team) throw new HttpException(StatusCode.NOT_FOUND, 'Team not exist');
    return team;
  };
}
