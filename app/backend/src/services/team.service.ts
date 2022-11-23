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
}
