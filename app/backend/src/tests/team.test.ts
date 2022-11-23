import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon')
import TeamModel from '../database/models/Team';
import { teams, oneTeam } from './mocks/team';
import { app } from '../app'; 
import { StatusCodes as code } from 'http-status-codes';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Integration testing on the /team endpoint', () => {
    before(() => {
        Sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    });

    after(() => {
        (TeamModel.findAll as sinon.SinonStub).restore();
    });

    describe('Get all com sucesso', () => {
        it('Verifica se ao fazer o get all retorna todos os times', async () => {
            const result = await request(app).get('/teams').send();

            expect(result.body).to.eql(teams);
            expect(result.body[0]).to.have.property('id');
            expect(result.body[0]).to.have.property('teamName');
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Get one team com sucesso', () => {
        before(() => {
            Sinon.stub(TeamModel, 'findOne').resolves(oneTeam as TeamModel);
        });
    
        after(() => {
            (TeamModel.findOne as sinon.SinonStub).restore();
        });

        it('Verifica se ao fazer o get one team retorna o time pelo id', async () => {
            const result = await request(app).get('/teams/1').send();
    
            expect(result.body).to.eql(oneTeam);
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Get one team com falha', () => {
        before(() => {
            Sinon.stub(TeamModel, 'findOne').resolves();
        });
    
        after(() => {
            (TeamModel.findOne as sinon.SinonStub).restore();
        });

        it('Verifica se ao fazer o get one team em um time que não existe retorna um erro', async () => {
            const result = await request(app).get('/teams/50').send();
    
            expect(result.body.message).to.eq('Team not exist');
            expect(result).to.have.status(code.NOT_FOUND);
        });
    });
});
