import sinon from 'sinon';
import chai from 'chai';

import chaiHttp from 'chai-http';

import { app } from '../../app';
import User from '../../database/models/User';
import MockUser from './mockUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de Criação de Usuario', () => {
  afterEach(sinon.restore);

  it('Faz requisição para /user com email invalido', async function() {
    const response = await chai
    .request(app)
    .post('/user')
    .send({
      email: 'emailInvalido',
      password: '123456',
      username: 'usuario de teste',
      pictureUrl: 'url'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: '"email" must be a valid email'
    })
  });

  it('Faz requisição para /user com senha menor que 6 caracteres', async function() {
    const response = await chai
    .request(app)
    .post('/user')
    .send({
      email: 'email@test.com',
      password: '123',
      username: 'usuario de teste',
      pictureUrl: 'url'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: '"password" length must be at least 6 characters long'
    })
  });

  it('Faz requisição para /user com username menor que 3 caracteres', async function() {
    const response = await chai
    .request(app)
    .post('/user')
    .send({
      email: 'email@test.com',
      password: '123456',
      username: 'us',
      pictureUrl: 'url'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: '"username" length must be at least 3 characters long'
    })
  });

  it('Faz requisição para /user com email já cadastrado', async function() {
    sinon.stub(User, "findOne").resolves(MockUser);
    const response = await chai
    .request(app)
    .post('/user')
    .send({
      email: 'email@test.com',
      password: '123456',
      username: 'usuario de testes',
      pictureUrl: 'url'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'email already used'
    })
  });

  it('Faz requisição para /user com username já cadastrado', async function() {
    sinon.stub(User, "findOne")
    .onFirstCall().resolves(null)
    .onSecondCall().resolves(MockUser);

    const response = await chai
    .request(app)
    .post('/user')
    .send({
      email: 'email@test.com',
      password: '123456',
      username: 'usuario de testes',
      pictureUrl: 'url'
    });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'username already used'
    })
  });

  it('Faz requisição para /user e cadastra um usuario com sucesso', async function() {
    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(User, "create").resolves(MockUser);

    const response = await chai
    .request(app)
    .post('/user')
    .send({
      email: 'email@test.com',
      password: '123456',
      username: 'usuario de testes',
      pictureUrl: 'url'
    });

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({
      id: 1
    })
  });
})