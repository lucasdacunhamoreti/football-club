import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon')
import MatchModel from '../database/models/Match';
import { placingTeamHome, placingTeamAway, placingAllTeam } from './mocks/leaderboard';
import { matchesNotInProgress } from './mocks/match';
import { app } from '../app'; 
import { StatusCodes as code } from 'http-status-codes';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Integration testing on the /leaderboard endpoint', () => {
    describe('Lists all scores of team home', () => {
        before(() => {
            Sinon.stub(MatchModel, 'findAll').resolves(matchesNotInProgress as any); // Arrumar
        });
    
        after(() => {
            (MatchModel.findAll as sinon.SinonStub).restore();
        });

        it('Returns code 200 and a list of scores', async () => {
            const result = await request(app).get('/leaderboard/home').send();
            
            expect(result.body).to.eql(placingTeamHome);
            expect(result).to.have.status(code.OK);
            expect(result.body[0]).to.have.property('name');
            expect(result.body[0]).to.have.property('totalPoints');
            expect(result.body[0]).to.have.property('totalGames');
            expect(result.body[0]).to.have.property('totalVictories');
            expect(result.body[0]).to.have.property('totalDraws');
            expect(result.body[0]).to.have.property('totalLosses');
            expect(result.body[0]).to.have.property('goalsFavor');
            expect(result.body[0]).to.have.property('goalsOwn');
            expect(result.body[0]).to.have.property('goalsBalance');
            expect(result.body[0]).to.have.property('efficiency');
        });
    });

    describe('Lists all scores of team away', () => {
        before(() => {
            Sinon.stub(MatchModel, 'findAll').resolves(matchesNotInProgress as any); // Arrumar
        });
    
        after(() => {
            (MatchModel.findAll as sinon.SinonStub).restore();
        });

        it('Returns code 200 and a list of scores', async () => {
            const result = await request(app).get('/leaderboard/away').send();
            
            expect(result.body).to.eql(placingTeamAway);
            expect(result).to.have.status(code.OK);
            expect(result.body[0]).to.have.property('name');
            expect(result.body[0]).to.have.property('totalPoints');
            expect(result.body[0]).to.have.property('totalGames');
            expect(result.body[0]).to.have.property('totalVictories');
            expect(result.body[0]).to.have.property('totalDraws');
            expect(result.body[0]).to.have.property('totalLosses');
            expect(result.body[0]).to.have.property('goalsFavor');
            expect(result.body[0]).to.have.property('goalsOwn');
            expect(result.body[0]).to.have.property('goalsBalance');
            expect(result.body[0]).to.have.property('efficiency');
        });
    });

    describe('Lists all placings of teams', () => {
        before(() => {
            Sinon.stub(MatchModel, 'findAll').resolves(matchesNotInProgress as any); 
        });
    
        after(() => {
            (MatchModel.findAll as sinon.SinonStub).restore();
        });

        it('Returns code 200 and a list of scores', async () => {
            const result = await request(app).get('/leaderboard').send();
            console.log(result.body);
            
            expect(result.body).to.eql(placingAllTeam);
            expect(result).to.have.status(code.OK);
            expect(result.body[0]).to.have.property('name');
            expect(result.body[0]).to.have.property('totalPoints');
            expect(result.body[0]).to.have.property('totalGames');
            expect(result.body[0]).to.have.property('totalVictories');
            expect(result.body[0]).to.have.property('totalDraws');
            expect(result.body[0]).to.have.property('totalLosses');
            expect(result.body[0]).to.have.property('goalsFavor');
            expect(result.body[0]).to.have.property('goalsOwn');
            expect(result.body[0]).to.have.property('goalsBalance');
            expect(result.body[0]).to.have.property('efficiency');
        });
    });


});
