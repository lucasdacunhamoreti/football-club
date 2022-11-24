import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon')
import MatchModel from '../database/models/Match';
import { IMatchComplete } from '../interfaces/IMatch';
import { matches, matchesInProgress, matchesNotInProgress, insertNewMatch, newMatchReturned } from './mocks/match';
import { app } from '../app'; 
import { StatusCodes as code } from 'http-status-codes';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Integration testing on the /match endpoint', () => {
    describe('List all matches', () => {
        before(() => {
            Sinon.stub(MatchModel, 'findAll').resolves(matches as any); // Arrumar
        });
    
        after(() => {
            (MatchModel.findAll as sinon.SinonStub).restore();
        });

        it('Checks if all matches with status 200 are returned', async () => {
            const result = await request(app).get('/matches').send();

            expect(result.body).to.eql(matches);
            expect(result.body[0]).to.have.property('id');
            expect(result.body[0]).to.have.property('id');
            expect(result.body[0]).to.have.property('homeTeam');
            expect(result.body[0]).to.have.property('homeTeamGoals');
            expect(result.body[0]).to.have.property('awayTeam');
            expect(result.body[0]).to.have.property('awayTeamGoals');
            expect(result.body[0]).to.have.property('inProgress');
            expect(result.body[0]).to.have.property('teamHome');
            expect(result.body[0]).to.have.property('teamAway');
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Lists all matches that are in progress', () => {
        before(() => {
            Sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as any); // Arrumar
        });
    
        after(() => {
            (MatchModel.findAll as sinon.SinonStub).restore();
        });

        it('Checks if all matches in progress with status 200 are returned', async () => {
            const result = await request(app).get('/matches?inProgress=true').send();

            expect(result.body).to.eql(matchesInProgress);
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Lists all matches that are not in progress', () => {
        before(() => {
            Sinon.stub(MatchModel, 'findAll').resolves(matchesNotInProgress as any); // Arrumar
        });
    
        after(() => {
            (MatchModel.findAll as sinon.SinonStub).restore();
        });

        it('Checks if all matches not in progress with status 200 are returned', async () => {
            const result = await request(app).get('/matches?inProgress=false').send();

            expect(result.body).to.eql(matchesNotInProgress);
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Lists all matches that are not in progress', () => {
        before(() => {
            Sinon.stub(MatchModel, 'findAll').resolves(matchesNotInProgress as any); // Arrumar
        });
    
        after(() => {
            (MatchModel.findAll as sinon.SinonStub).restore();
        });

        it('Checks if all matches not in progress with status 200 are returned', async () => {
            const result = await request(app).get('/matches?inProgress=false').send();

            expect(result.body).to.eql(matchesNotInProgress);
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Insert a new match successfully', () => {
        before(() => {
            Sinon.stub(MatchModel, 'create').resolves(newMatchReturned as any); // Arrumar
        });
    
        after(() => {
            (MatchModel.create as sinon.SinonStub).restore();
        });

        it('Insert the match successfully and return code 201', async () => {
            const result = await request(app).post('/matches').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSJ9LCJpYXQiOjE2NjkyOTU4MjV9.aH-mXCakA9lMP83O2IlWoSnAtQMNKC5LeSePBAJHBHM').send(insertNewMatch);

            expect(result.body).to.eql(newMatchReturned);
            expect(result).to.have.status(code.CREATED);
        });
    });
});
