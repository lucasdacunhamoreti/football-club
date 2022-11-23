import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon')
import UserModel from '../database/models/User';
import { userData, login } from './mocks/user';
import { app } from '../app'; 
import * as jwt from 'jsonwebtoken';
import { StatusCodes as code } from 'http-status-codes';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Integration testing on the /login endpoint', () => {
    before(() => {
        Sinon.stub(UserModel, 'findOne').resolves(userData.userValid as UserModel);
    });

    after(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
    });

    describe('Successfully login', () => {
        it('Returns token upon login', async () => {
            const result = await request(app).post('/login').send(login.userValid);

            expect(result.body).to.have.property('token');
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Email invalid', () => {
        it('Return error when passing an invalid email', async () => {
            const result = await request(app).post('/login').send(login.userInvalidEmail);
            
            expect(result).to.have.status(code.BAD_REQUEST);
            expect(result.body.message).to.eq('All fields must be filled');
        });
    });

    describe('User not exist', () => {
        it('Returns error when user does not exist on database', async () => {
            const result = await request(app).post('/login').send(login.userNotExist);
            
            expect(result).to.have.status(code.UNAUTHORIZED);
            expect(result.body.message).to.eq('Incorrect email or password');
        });
    });

    describe('User incorrect password', () => {
        it('Returns error when user enters incorrect password', async () => {
            const result = await request(app).post('/login').send(login.userIncorrectPassword);
            
            expect(result).to.have.status(code.UNAUTHORIZED);
            expect(result.body.message).to.eq('Incorrect email or password');
        });
    });

    describe('Token valid', () => {
        before(() => {
            Sinon.stub(jwt, 'verify').returns({ data: login.userValid } as any);
        });

        after(() => {
            (jwt.verify as Sinon.SinonStub).restore();
        });

        it('Returns the token when the user is valid', async () => {
            const result = await request(app).get('/login/validate').set('Authorization', 'g34efe$4sd@3fxd').send();
            
            expect(result.body).to.eql({ role: userData.userValid.role });
            expect(result).to.have.status(code.OK);
        });
    });

    describe('Token invalid', () => {
        before(() => {
            Sinon.stub(jwt, 'verify').resolves();
        });

        after(() => {
            (jwt.verify as Sinon.SinonStub).restore();
        });

        it('Returns the token when the user is invalid', async () => {
            const result = await request(app).get('/login/validate').send();
            
            expect(result.body).to.eql({ message: 'Token must be a valid token' });
            expect(result).to.have.status(code.UNAUTHORIZED);
        });
    });
});
